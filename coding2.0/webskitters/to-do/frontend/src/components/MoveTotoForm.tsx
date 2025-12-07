import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Typography,
} from "@mui/material";

import { toast } from "react-toastify";

import {MoveTodo} from "@/services/TodoService";
import { MoveTodoFormProps } from "@/interfaces/props.types/MoveTodoFormProps";
import { MoveTodoPayload } from "@/interfaces/payload.types/MoveTodoPayload";
export default function MoveTodoForm({
    open,
    setOpen, 
    dialogTitle,
    dialogContentText,
    todoId,
    todoTitle,
                                         }: MoveTodoFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedSection, setSelectedSection] = useState<{ sectionId: number | null; topicId: number | null }>({
        sectionId: null,
        topicId: null,
    });

    useEffect(() => {
        if (open) {
            setIsSubmitting(false);
        }
    }, [open]);


    //handeling closing of the from
    const handelClose=()=>{
        selectedSection.sectionId = null;
        selectedSection.topicId = null;
        setSelectedSection(selectedSection);
        setOpen(false);
    }
    //submitting form
    const submitClose=async ()=>{
        if(!todoId){
            toast.error("item already at the location");
            return;
        }
        const moveTodoPayload: MoveTodoPayload= {
            
        }
        setOpen(false);
        await MoveTodo(moveTodoPayload);


    }
    return (
        <Dialog
            open={open}
            onClose={() => handelClose()}
            PaperProps={{
                component: "form",
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                },
                sx: { backgroundImage: "none", width: "30%" },
            }}
        >
            <DialogTitle>
                {dialogTitle}
                <Typography>({todoTitle})</Typography>
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                <Typography variant="h6">Move to :</Typography>
                {
                    <>list</>
                    

                }



            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={async () => {
                        setIsSubmitting(true);
                        await submitClose();
                        setIsSubmitting(false);
                    }}
                >
                    {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Move"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
