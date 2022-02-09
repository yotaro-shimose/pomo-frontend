import { atom } from "recoil";
import { Task } from "domain/entity";

export const taskListState = atom<Task[]>({
  key: "task",
  default: [],
});


export const selectedTaskState = atom<Task | null>({
  key: "selectedTask",
  default: null,
});
