import { CalendarId, TaskId, TaskListId } from "./value";

export interface Task {
  id: TaskId;
  name: string;
}

export interface Calendar {
  id: CalendarId;
  summary: string;
}

export interface TaskList {
  id: TaskListId;
  summary: string;
}

