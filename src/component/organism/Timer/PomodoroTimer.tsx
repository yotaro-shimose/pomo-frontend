// React
import { FC, useEffect } from "react";
import { Typography, Toolbar, Grid } from "@material-ui/core";
import { useTimer } from "react-timer-hook";
import TimerButton from "./atom/TimerButton";
import TimerScreen from "./atom/TimerScreen";
import ConfirmDialog from "./ConfirmDialog";
import { startTimeState } from "component/organism/LoggedInContainer/state";
import { cancelFinishFactory, confirmFinishFactory, timerFinishFactory } from "./factory";
import { Task } from "domain/entity";

// State
import { useSetRecoilState, useRecoilValue } from "recoil";
import { openState } from "./state";

interface PomodoroTimerProps {
  userId: string;
  timerConfig: number;
  task: Task;
}

const playNotificationSound = () => {
  const player = new Audio("../notification.wav");
  const playPromise = player.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.log("playback prevented ", error);
    });
  }
};

const PomodoroTimer: FC<PomodoroTimerProps> = (props) => {

  const setStartTime = useSetRecoilState(startTimeState);
  useEffect(() => {
    setStartTime(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Inner: FC = () => InnerPomodoroTimer(props);

  return (
    <Inner />
  );
};

// TODO SelectedTimerの情報を１つの情報に固める

const InnerPomodoroTimer: FC<PomodoroTimerProps> = (props) => {
  const setOpen = useSetRecoilState(openState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const startTime = useRecoilValue(startTimeState);
  const open = useRecoilValue(openState);

  // onExpireの定義
  const finish = timerFinishFactory(props.userId, props.task, startTime, handleClose);
  const onExpire = () => {
    playNotificationSound();
    finish();
  };

  // Timer定義
  const time = new Date();
  time.setMinutes(time.getMinutes() + props.timerConfig);
  const { seconds, minutes, start, pause } = useTimer({
    autoStart: true,
    expiryTimestamp: time,
    onExpire: onExpire,
  });

  const cancel = cancelFinishFactory(start, handleClose);
  const confirmFinish = confirmFinishFactory(pause, handleOpen);


  const dispMinutes = ("00" + minutes).slice(-2);
  const dispSeconds = ("00" + seconds).slice(-2);
  const finishName = "finish";

  const buttonDataList = [
    {
      func: confirmFinish,
      buttonName: finishName,
    },
  ];

  return (

    <div className="PomodoroTimer">
      <Toolbar />
      <Typography variant="h3">{props.task.name}</Typography>
      <TimerScreen minutes={dispMinutes} seconds={dispSeconds} />
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        {buttonDataList.map((buttonData, _index) => (
          <Grid item>
            <TimerButton func={buttonData.func} buttonName={buttonData.buttonName} />
          </Grid>
        ))}
      </Grid>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        finishFunc={finish}
        cancelFunc={cancel}
      ></ConfirmDialog>
    </div>
  )
}

export default PomodoroTimer;
