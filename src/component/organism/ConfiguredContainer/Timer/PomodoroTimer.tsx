import { Grid, Toolbar, Typography } from "@material-ui/core";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentTimerState, useClearTimer, useFinishTimer } from "../state";
import TimerButton from "./atom/TimerButton";
import TimerScreen from "./TimerScreen";
import ConfirmDialog from "./ConfirmDialog";


interface PomodoroTimerProps {
  userId: string;
}

const PomodoroTimer: FC<PomodoroTimerProps> = (props) => {
  const currentTimer = useRecoilValue(currentTimerState);
  if (currentTimer === null) {
    throw Error("Timer is not set yet");
  }
  const [isOpenFinishDialog, setIsOpenFinishDialog] = useState(false);
  const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);
  const finishTimer = useFinishTimer();
  const clearTimer = useClearTimer();
  const openFinishDialog = () => setIsOpenFinishDialog(true);
  const closeFinishDialog = () => setIsOpenFinishDialog(false);
  const openCancelDialog = () => setIsOpenCancelDialog(true);
  const closeCancelDialog = () => setIsOpenCancelDialog(false);
  const confirmPropsList = [
    {
      isOpen: isOpenFinishDialog,
      close: closeFinishDialog,
      finishFunc: finishTimer,
    },
    {
      isOpen: isOpenCancelDialog,
      close: closeCancelDialog,
      finishFunc: clearTimer,
    }
  ]
  const buttonDataList = [
    {
      func: openFinishDialog,
      buttonName: "終了",
    },
    {
      func: openCancelDialog,
      buttonName: "キャンセル"
    }
  ];


  return (
    <div className="PomodoroTimer">
      <Toolbar />
      <Typography variant="h3">{currentTimer.task.name}</Typography>
      <TimerScreen currentTimer={currentTimer} />
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        {buttonDataList.map((buttonData, index) => (
          <Grid item>
            <TimerButton key={index} func={buttonData.func} buttonName={buttonData.buttonName} />
          </Grid>
        ))}
      </Grid>
      {confirmPropsList.map((props, index) => (
        <ConfirmDialog key={index} isOpen={props.isOpen} close={props.close} onConfirm={props.finishFunc} />
      ))}
    </div>
  );
};
export default PomodoroTimer;