import { pushEvent } from "infrastructure/backend_api";
import { Task } from "domain/entity";
import { getStringFromDate } from "./dateFormat";

export const confirmFinishFactory = (pause: () => void, handleOpen: () => void) => () => {
  handleOpen();
  pause();
};

export const timerFinishFactory =
  (id: string, task: Task, startTime: Date, handleClose: () => void) => () => {
    const format = "YYYY-MM-DD hh:mm:ss";
    handleClose();
    pushEvent(id, {
      task: task,
      startTime: getStringFromDate(startTime, format),
      endTime: getStringFromDate(new Date(), format),
    });
  };

export const cancelFinishFactory = (start: () => void, onClose: () => void) => () => {
  start();
  onClose();
};
