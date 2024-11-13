import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  TodoId: number;
  TodoText: string;
  isEditing: boolean;
  editText: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}
const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    ToDo: [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
