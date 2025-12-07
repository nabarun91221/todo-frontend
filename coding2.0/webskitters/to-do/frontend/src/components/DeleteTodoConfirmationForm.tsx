import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dispatch, SetStateAction } from 'react';

export default function DeleteTodoConfirmationForm(props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    submitAndClose: () => void;
}) {
    const handleDelete = async () => {
        props.submitAndClose();
    };

    const handleClose = async () => {
        await handleDelete();
        props.setOpen(false);
    };

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="delete-confirmation-dialog-title"
            fullWidth
            maxWidth="sm" // Adjust width based on screen size
        >
            <DialogTitle id="delete-confirmation-dialog-title" sx={{ fontWeight: 'bold' }}>
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Do you really want to delete the following webpaper?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-start', px: 3, pb: 2 }}>
                <Button variant="outlined" color="primary" onClick={() => props.setOpen(false)}>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
