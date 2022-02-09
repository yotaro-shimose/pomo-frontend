import { taskListState, selectedTaskState } from "component/organism/ConfiguredContainer/state";
// React
import { FC, useLayoutEffect } from "react";

// Material UI
import { Grid } from "@material-ui/core";

// Components
import Sidebar from "component/organism/Sidebar";
import Timer from "component/organism/Timer";

// State
import { useSetRecoilState, useRecoilState } from "recoil";
import { userConfigState, timerConfigState } from "component/organism/LoggedInContainer/state";
// API
import { fetchUserConfig, fetchTask } from "infrastructure/backend_api";

// Interfaces
import { UserConfig } from "domain/value";
import { Task } from "domain/entity";

interface ConfiguredContainerProps {
  userId: string;
}

export const ConfiguredContainer: FC<ConfiguredContainerProps> = (props) => {
  const userId = props.userId;
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
      <Grid container>
        <Grid item xs={3}>
          <Sidebar
            selectedTaskId={selectedTaskId}
            setSelectedTask={setSelectedTask}
            setTimerConfig={setTimerConfig}
          />
        </Grid>
        {/* <Toolbar /> */}
        <Grid item xs={9}>
          <Timer
            selectedTask={selectedTask}
            userId={userId}
            timerConfig={timerConfig}
            setTimerConfig={setTimerConfig}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ConfiguredContainer;
