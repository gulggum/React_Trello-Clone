import { atom } from "recoil";

interface ITodoState {
  [key: string]: string[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    ToDo: ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  },
});
