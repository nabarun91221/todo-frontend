import { Dispatch, SetStateAction } from "react";
export interface CreateTodoFormProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    submitAndClose: (sectionName: string) => void;
    dialogContentText: string;
    dialogTitle: string;
    placeholder: string;
} 