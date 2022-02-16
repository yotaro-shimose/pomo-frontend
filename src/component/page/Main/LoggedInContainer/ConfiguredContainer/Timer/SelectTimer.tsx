import { FC } from "react";
import { Task } from "domain/entity";
import { Grid } from "@material-ui/core";
import TimerButton from "../../../../../shared/TimerButton";
import { CurrentTimer } from "domain/value";

interface SelectTimerProps {
  task: Task;
  setCurrentTimer(currentTimer: CurrentTimer): void;
  clearSelectedTask(): void;
}

const SelectTimer: FC<SelectTimerProps> = (props) => {
  const setTimer = (lengthInMin: number) => () => {
    const start = new Date();
    const currentTimer = {
      task: props.task,
      start: start,
      lengthInSec: lengthInMin * 60,
    }
    props.clearSelectedTask();
    props.setCurrentTimer(currentTimer);
  };

  const buttonDataList = [
    {
      func: setTimer(5),
      buttonName: "5分",
    },
    {
      func: setTimer(15),
      buttonName: "15分",
    },
    {
      func: setTimer(30),
      buttonName: "30分",
    },
  ];

  return (
    <div className="SelectTimer">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <h3>{props.task.name}</h3>
        </Grid>
      </Grid>
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        {buttonDataList.map((buttonData, index) => (
          <Grid item>
            <TimerButton func={buttonData.func} buttonName={buttonData.buttonName} key={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SelectTimer;
