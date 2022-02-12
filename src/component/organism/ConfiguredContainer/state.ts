import { atom, selector } from "recoil";
import { Task } from "domain/entity";
import { userIdState } from "component/page/Main/state";
import { fetchTask } from "infrastructure/backend_api";
export const taskListState = selector<Task[]>({
  key: "task",
  get: async ({ get }) => {
    const userId = get(userIdState);
    const taskList = await fetchTask(userId);
    return taskList
  }
});


export const selectedTaskState = atom<Task | null>({
  key: "selectedTask",
  default: null,
});
