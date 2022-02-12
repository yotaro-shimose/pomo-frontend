
import { atom, selector } from "recoil";
import { TaskList, Calendar } from "domain/entity";
import { fetchTaskList, fetchCalendar } from "infrastructure/backend_api";
import { userIdState } from "component/page/Main/state";
import { isConfiguredState, userConfigState } from "component/organism/LoggedInContainer/state";

export const taskListListState = selector<TaskList[]>({
  key: "taskList",
  get: async ({ get }) => {
    const userId = get(userIdState);
    return await fetchTaskList(userId);
  }
});

export const calendarListState = selector<Calendar[]>({
  key: "calendar",
  get: async ({ get }) => {
    const userId = get(userIdState);
    return await fetchCalendar(userId);
  }
});

// Define Enum
export const StepList = {
  TASKLIST: "TASKLIST",
  CALENDAR: "CALENDAR",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
} as const;
export type Step = typeof StepList[keyof typeof StepList];

export interface OnlineConfig {
  step: Step;
  taskListId: string;
  calendarId: string;
}

const initOnlineConfig = selector<OnlineConfig>({
  key: "initOnlineConfig",
  get: ({ get }) => {
    const step = StepList.TASKLIST;
    let taskListId;
    let calendarId;
    if (get(isConfiguredState)) {
      const userConfig = get(userConfigState);
      taskListId = userConfig.taskListId;
      calendarId = userConfig.calendarId;
    } else {
      taskListId = "";
      calendarId = "";
    }
    return { step, taskListId, calendarId }
  },
});

export const onlineConfigState = atom<OnlineConfig>({
  key: "onlineConfig",
  default: initOnlineConfig,
})

