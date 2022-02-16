import { FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { CurrentTimer } from "domain/value";
import { currentTimerState, useFinishTimer } from "../state";



const getExpiryDate = (currentTimer: CurrentTimer) => {
  const end = new Date(currentTimer.start.getTime());
  const lengthInSec = currentTimer.lengthInSec;
  end.setSeconds(end.getSeconds() + lengthInSec);
  return end;
}



const TimerStateContainer: FC = () => {
  const currentTimer = useRecoilValue(currentTimerState);
  if (!currentTimer) {
    throw Error("Timer is not set yet");
  }
  const now = new Date();
  const expiryTimeStamp = getExpiryDate(currentTimer);
  const remainInMilliSec = expiryTimeStamp.getTime() - now.getTime();
  const finishTimer = useFinishTimer();

  useEffect(() => {
    const id = setTimeout(() => {
      finishTimer();
    }, remainInMilliSec);
    return clearTimeout(id);
  })
  return null;
}

export default TimerStateContainer;