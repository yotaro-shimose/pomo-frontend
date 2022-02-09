import { taskListState, selectedTaskState } from "component/organism/ConfiguredContainer/state";
// React
import { FC, useLayoutEffect } from "react";

// Material UI
import { Toolbar } from "@material-ui/core";

// Components
import Sidebar from "component/organism/Sidebar";
import Content from "component/organism/Timer";

// State
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  userIdState,
} from "component/page/Main/state";
import { userConfigState, timerConfigState } from "component/organism/LoggedInContainer/state";
// API
import { fetchUserConfig, fetchTask } from "infrastructure/backend_api";

// Interfaces
import { UserConfig } from "domain/value";
import { Task } from "domain/entity";

const drawerWidth = 240;

export const ConfiguredContainer: FC = () => {
  const userId = useRecoilValue(userIdState);
  const setUserConfig = useSetRecoilState(userConfigState);
  const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
  const [timerConfig, setTimerConfig] = useRecoilState(timerConfigState);
  const setTaskList = useSetRecoilState(taskListState);

  const selectedTaskId = selectedTask ? selectedTask.id : null;
  useLayoutEffect(() => {
    fetchUserConfig(userId).then((userConfig: UserConfig) => {
      setUserConfig(userConfig);
    });
    fetchTask(userId).then((taskList: Task[]) => {
      setTaskList(taskList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  return (
    <div className="LoggedInScreen">
      <Sidebar
        drawerWidth={drawerWidth}
        selectedTaskId={selectedTaskId}
        setSelectedTask={setSelectedTask}
        setTimerConfig={setTimerConfig}
      />
      <Toolbar />
      <Content
        selectedTask={selectedTask}
        userId={userId}
        timerConfig={timerConfig}
        setTimerConfig={setTimerConfig}
      />
    </div>
  );
};

export default ConfiguredContainer;
