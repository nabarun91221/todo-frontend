import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useEffect, useState} from "react";
import {CircularProgress, TextField} from "@mui/material";
import {toast} from "react-toastify";
import { CreateTodoFormProps } from "@/interfaces/props.types/CreateTodoFormProps";


export default function CreateTodoForm({
  open,
  setOpen,
  submitAndClose,
  dialogTitle,
  dialogContentText,
  placeholder
}:CreateTodoFormProps) {


    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (open) {
            setIsSubmitting(false);
        }
    },[open]);


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
          label={placeholder}
          variant="outlined"
        />
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
            {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
