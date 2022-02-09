import { FC } from "react";
import { Task } from "domain/entity";

// State
import SelectTimer from "./SelectTimer";
import { Grid } from "@material-ui/core";
import PomodoroTimer from "./PomodoroTimer";
import PomodoroStopWatch from "./PomodoroStopWatch";
import Msg from "component/atom/Msg";

interface ContentProps {
  userId: string;
  selectedTask: Task | null;
  timerConfig: number | null;
  setTimerConfig(timerConfig: number | null): void;
}
const Timer: FC<ContentProps> = (props) => {
  let content;
  if (props.selectedTask) {
    if (props.timerConfig != null) {
      if (props.timerConfig) {
        content = (
          <PomodoroTimer
            userId={props.userId}
            timerConfig={props.timerConfig}
            task={props.selectedTask}
          > </PomodoroTimer>
        );
      } else {
        content = (
          <PomodoroStopWatch userId={props.userId} task={props.selectedTask} > </PomodoroStopWatch>
        );
      }
    } else {
      content = <SelectTimer setTimerConfig={props.setTimerConfig} task={props.selectedTask} />;
    }
  } else {
    content = (
      <Msg msg={"始めるタスクを選んでね!"} />
    );
  }
  return (
    <div className="Content" >
      <Grid container justifyContent="center" alignItems="center">
        {content}
      </Grid>
      {/* <Toolbar /> */}
      {/* {content} */}
    </div>
  );
};

export default Timer;
