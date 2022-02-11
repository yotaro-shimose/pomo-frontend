import { atom, selector, selectorFamily } from "recoil";
import { UserConfig, Timer } from "domain/value";


export const userConfigState = atom<UserConfig>({
  key: "userConfig",
  default: { calendarId: null, taskListId: null },
});

export const isConfiguredState = selector<boolean>({
  key: "isConfigured",
  get: ({ get }) => {
    const userProfile = get(userConfigState);
    if (userProfile.calendarId === null && userProfile.taskListId === null) {
      return false;
    }
    if (userProfile.calendarId !== "" && userProfile.taskListId !== "") {
      return true;
    }
    return false;
  },
});


export const timerState = atom<Timer | null>({
  key: "timer",
  default: null,
});

export const startTimeState = atom<Date>({
  key: "startTime",
  default: new Date(),
});

export const timerConfigState = atom<number | null>({
  key: "timerConfig",
  default: null,
});

