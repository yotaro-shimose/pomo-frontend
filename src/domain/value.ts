import { Task } from "./entity";

export interface UserConfig {
  taskListId: string;
  calendarId: string;
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

export interface CurrentTimer {
  task: Task;
  start: Date;
  lengthInSec: number;
}


export type UserId = string;
export type TaskListId = string;
export type CalendarId = string;
export type TaskId = string;