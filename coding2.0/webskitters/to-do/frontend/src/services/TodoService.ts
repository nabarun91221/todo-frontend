import { CreateTodoPayload } from "@/interfaces/payload.types/CreateTodoPayload";
import { MoveTodoPayload } from "@/interfaces/payload.types/MoveTodoPayload";
import { Todo } from "@/interfaces/todo.type";
import { CreateSectionPayload } from "@/interfaces/payload.types/CreateSectionPayload";
export const CreateTodo = async (payload: CreateTodoPayload) => {
    console.log("todo created");
}
export const MoveTodo = async (payload: MoveTodoPayload) => {
    console.log("todo moved");
}
export const UpdateTodo = async (payload: Todo) => {
    console.log("todo moved");
}

export const DeleteTodo = async (payload: Todo) => {
    console.log("todo moved");
}


export const CreateSection = async (payload: CreateSectionPayload) => {
    console.log("todo created");
}
export const UpdateSection = async (payload: CreateSectionPayload) => {
    console.log("todo moved");
}
export const DeleteSection = async (payload: string) => {
    console.log("todo moved");
}
