import { Task, TaskList, Calendar } from "domain/entity";
import { UserConfig, Event } from "domain/value";
import axios, { AxiosResponse } from "axios";
interface LoginResponse {
  id: string;
}

const BackendURL = process.env.REACT_APP_BACKEND_URL;

const get_config = (id?: string) => {

  let headers = {
    "Content-Type": "application/json",
    id: "",
  };
  if (id) {
    headers = {
      "Content-Type": "application/json",
      id: id,
    };
  }
  return {
    headers: headers,
  };
};

export const fetchTask = async (id: string) => {
  const taskList = await axios
    .get(`${BackendURL}/task`, get_config(id))
    .then((res: AxiosResponse<Task[]>) => {
      return res.data;
    });
  return taskList;
};

export const fetchTaskList = async (id: string) => {
  const taskListList = await axios
    .get(`${BackendURL}/taskList`, get_config(id))
    .then((res: AxiosResponse<TaskList[]>) => {
      return res.data;
    });
  return taskListList;
};

export const fetchCalendar = async (id: string) => {
  const calendarList = await axios
    .get(`${BackendURL}/calendar`, get_config(id))
    .then((res: AxiosResponse<Calendar[]>) => {
      return res.data;
    });
  return calendarList;
};

export const pushEvent = async (id: string, event: Event) => {
  return await axios.post(`${BackendURL}/event`, event, get_config(id));
};

export const login = async (code: string) => {
  const userId = await axios
    .post<LoginResponse>(
      `${BackendURL}/login`,
      {
        authorizationCode: code,
      },
      get_config()
    )
    .then((res: AxiosResponse<LoginResponse>) => {
      return res.data.id;
    });
  return userId;
};

export const fetchUserConfig = async (id: string) => {
  const calendarList = await axios
    .get(`${BackendURL}/userConfig`, get_config(id))
    .then((res: AxiosResponse<UserConfig>) => {
      if (res.data.taskListId === null && res.data.calendarId === null) {
        return null;
      } else {
        return res.data;
      }
    });
  return calendarList;
};

export const updateUserConfig = async (id: string, config: UserConfig) => {
  return await axios
    .put<boolean>(`${BackendURL}/user`, config, {
      headers: {
        "Content-Type": "application/json",
        id: id,
      },
    })
}