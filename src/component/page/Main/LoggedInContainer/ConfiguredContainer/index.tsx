import { currentTimerState, isTimerSetState, selectedTaskState } from "component/page/Main/LoggedInContainer/ConfiguredContainer/state";
// React
import { FC } from "react";

// Material UI
import { Grid } from "@material-ui/core";

// Components
import Sidebar from "component/page/Main/LoggedInContainer/ConfiguredContainer/Sidebar";
import Timer from "component/page/Main/LoggedInContainer/ConfiguredContainer/Timer";

// State
import { useRecoilState, useRecoilValue } from "recoil";
import TimerStateContainer from "../TimerStateContainer";

interface ConfiguredContainerProps {
  userId: string;
}

interface ConditionedTimerStateContainerProps {
  isTimerSet: boolean;
}

export const ConfiguredContainer: FC<ConfiguredContainerProps> = (props) => {
  const userId = props.userId;
  const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
  const selectedTaskId = selectedTask ? selectedTask.id : null;
  const isTimerSet = useRecoilValue(isTimerSetState);
  const [currentTimer, setCurrentTimer] = useRecoilState(currentTimerState);
  const ConditionedTimerStateContainer: FC<ConditionedTimerStateContainerProps> = (props) => {
    if (props.isTimerSet) {
      return <TimerStateContainer />
    } else {
      return null;
    }
  };

  return (
    <div className="ConfiguredContainer">
      <ConditionedTimerStateContainer isTimerSet={isTimerSet} />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar
            selectedTaskId={selectedTaskId}
            setSelectedTask={setSelectedTask}
          />
        </Grid>
        <Grid item xs={10}>
          <Timer
            userId={userId}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            currentTimer={currentTimer}
            setCurrentTimer={setCurrentTimer}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ConfiguredContainer;
