import { selectedTaskState } from "component/organism/ConfiguredContainer/state";
// React
import { FC } from "react";

// Material UI
import { Grid } from "@material-ui/core";

// Components
import Sidebar from "component/organism/Sidebar";
import Timer from "component/organism/Timer";

// State
import { useRecoilState } from "recoil";
import { timerConfigState } from "component/organism/LoggedInContainer/state";

interface ConfiguredContainerProps {
  userId: string;
}

export const ConfiguredContainer: FC<ConfiguredContainerProps> = (props) => {
  const userId = props.userId;
  const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
  const [timerConfig, setTimerConfig] = useRecoilState(timerConfigState);
  const selectedTaskId = selectedTask ? selectedTask.id : null;



  return (
    <div className="ConfiguredContainer">
      <Grid container>
        <Grid item xs={2}>
          <Sidebar
            selectedTaskId={selectedTaskId}
            setSelectedTask={setSelectedTask}
            setTimerConfig={setTimerConfig}
          />
        </Grid>
        <Grid item xs={10}>
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
