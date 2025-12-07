import { Dispatch, SetStateAction } from "react";
export interface MoveTodoFormProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dialogContentText: string;
    dialogTitle: string;
    todoId: string;
    todoTitle: string;
} 