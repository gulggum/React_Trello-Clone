import { atom } from "recoil";

export interface ITodo {
  TodoId: number;
  TodoText: string;
  isEditing: boolean;
  editText: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    ToDo: [],
    Doing: [],
    Done: [],
  },
});
