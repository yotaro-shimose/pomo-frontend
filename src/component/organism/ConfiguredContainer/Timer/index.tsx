import { FC } from "react";
import { Task } from "domain/entity";

// State
import SelectTimer from "./SelectTimer";
import { Grid } from "@material-ui/core";
import PomodoroTimer from "./PomodoroTimer";
import Msg from "component/atom/Msg";
import { CurrentTimer } from "domain/value";

interface TimerProps {
  userId: string;
  selectedTask: Task | null;
  setSelectedTask(task: Task | null): void;
  currentTimer: CurrentTimer | null;
  setCurrentTimer(currentTimer: CurrentTimer): void;
}
const Timer: FC<TimerProps> = (props) => {
  const userId = props.userId;
  const selectedTask = props.selectedTask;
  const currentTimer = props.currentTimer;
  const setCurrentTimer = props.setCurrentTimer;
  const clearSelectedTask = () => props.setSelectedTask(null);
  const Content = () => {
    if (selectedTask) {
      if (currentTimer && currentTimer.task.id === selectedTask.id) {
        return <PomodoroTimer userId={userId} />;
      } else {
        return <SelectTimer task={selectedTask} clearSelectedTask={clearSelectedTask} setCurrentTimer={setCurrentTimer} />
      }
    } else {
      if (currentTimer) {
        return <PomodoroTimer userId={userId} />
      } else {
        return <Msg msg="始めるタスクを選んでね!" />
      }
    }
  }

  return (
    <div className="Timer" >
      <Grid container justifyContent="center" alignItems="center">
        <Content />
      </Grid>
    </div>
  );
};

export default Timer;
