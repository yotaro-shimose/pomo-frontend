import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { Task } from "domain/entity";
import { CurrentTimer } from "domain/value";
import { userIdState } from "component/page/Main/state";
import { fetchTask, pushEvent } from "infrastructure/backend_api";
import { formatDate } from "./Timer/dateFormat";


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

export const currentTimerState = atom<CurrentTimer | null>({
  key: "currentTimer",
  default: null,
  // effects_UNSTABLE: [persistAtom],
})

export const isTimerSetState = selector<boolean>({
  key: "isTimerSet",
  get: ({ get }) => get(currentTimerState) !== null,
})

const playNotificationSound = () => {
  const player = new Audio("../notification.wav");
  const playPromise = player.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.log("playback prevented ", error);
    });
  }
};

export const useFinishTimer = () => {
  // Caller of this hook will subscribe to userId and currentTimer
  const userId = useRecoilValue(userIdState);
  const currentTimer = useRecoilValue(currentTimerState);
  if (!currentTimer) {
    throw Error("Can't finish timer because timer is not set yet");
  }
  const clearTimer = useClearTimer();
  const finishTimer = () => {
    const now = new Date();
    const start = currentTimer.start;
    const event = {
      task: currentTimer.task,
      startTime: formatDate(start),
      endTime: formatDate(now),
    }
    pushEvent(userId, event);
    playNotificationSound();
    clearTimer();
  }
  return finishTimer;
}

export const useClearTimer = () => {
  const setCurrentTimer = useSetRecoilState(currentTimerState);
  const setSelectedTask = useSetRecoilState(selectedTaskState);
  const clearCurrentTimer = () => setCurrentTimer(null);
  const clearSeleectedTask = () => setSelectedTask(null);
  return () => {
    clearCurrentTimer();
    clearSeleectedTask();
  }
}