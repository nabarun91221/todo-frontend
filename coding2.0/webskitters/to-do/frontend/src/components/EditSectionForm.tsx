import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import OutlinedInput from "@mui/material/OutlinedInput";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {CircularProgress, TextField} from "@mui/material";
import {toast} from "react-toastify";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from "@mui/material/Tooltip";

interface SectionCreationFormProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    submitAndClose:(sectionName:string) => void;
    deleteAndClose:()=>void;
    dialogContentText: string;
    dialogTitle: string;
    placeholder:string|undefined;
}

export default function CreationForm({
                                         open,
                                         setOpen,
                                         submitAndClose,
                                         deleteAndClose,
                                         dialogTitle,
                                         dialogContentText,
                                         placeholder
                                     }: SectionCreationFormProps) {


    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (open) {
            setIsSubmitting(false);
        }
    },[open]);

    const [textFieldValue, setTextFieldValue] = useState<string|undefined>();
    useEffect(() => {
        setTextFieldValue(placeholder!=undefined?placeholder:"");
    }, [placeholder]);

    return (

        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                component: "form",
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();

                },
                sx: { backgroundImage: "none", width: "30%" },
            }}
        >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
            >
                <DialogContentText>{dialogContentText}</DialogContentText>
                <TextField
                    id="new_name_input"
                    label="Section Name"
                    variant="outlined"
                    value={textFieldValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setTextFieldValue(event.currentTarget.value)}}
                />
                <Tooltip title={"Delete This Section"}>
                <Button variant={"outlined"} color={"warning"} onClick={() => {deleteAndClose()}}>
                    <DeleteOutlineIcon fontSize={"small"} color={"warning"}/>
                </Button>
                </Tooltip>
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={async () => {
                        setIsSubmitting(true);
                        const name = document.getElementById(
                            "new_name_input"
                        ) as HTMLInputElement;
                        if(name.value=='') {
                            toast.error("Field cannot be empty",{autoClose: 1000, position: "top-center"});
                            setIsSubmitting(false);
                        }
                        if (name.value) {
                            submitAndClose(name.value);
                        }
                    }}
                >
                    {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
