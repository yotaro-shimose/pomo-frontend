import { Task } from "./entity";

export interface UserConfig {
  taskListId: string | null;
  calendarId: string | null;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface Timer {
  task: Task;
  start: number;
  end: number;
}

export interface Event {
  task: Task,
  startTime: string,
  endTime: string
}