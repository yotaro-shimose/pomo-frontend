import { FC, useEffect, useState } from "react";
import { makeStyles, Theme, Grid } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { CurrentTimer } from "domain/value";

const RenderingInterval = 100; // in milli sec


interface TimerScreenProps {
    currentTimer: CurrentTimer,
}

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        TimerScreen: {
            fontSize: "9rem"
        }
    })
);

const getDisp = (remainInSec: number) => {
    const minutes = Math.floor(remainInSec / 60);
    const seconds = remainInSec % 60;
    const dispMinutes = ("00" + minutes).slice(-2);
    const dispSeconds = ("00" + seconds).slice(-2);
    return {
        minutes: dispMinutes,
        seconds: dispSeconds,
    }
}

const getRemainInMilliSec = (currentTimer: CurrentTimer) => {
    const now = new Date();
    const end = new Date(currentTimer.start.getTime());
    end.setSeconds(end.getSeconds() + currentTimer.lengthInSec);
    return end.getTime() - now.getTime();
}

const TimerScreen: FC<TimerScreenProps> = (props) => {
    const classes = useStyles();
    const [remainInMilliSec, setRemainInMilliSec] = useState(0);
    const remainInSec = Math.floor(remainInMilliSec / 1000);
    const { minutes, seconds } = getDisp(remainInSec);

    // Re-Render every RenderingInterval Milli Seconds
    useEffect(() => {
        const id = setTimeout(() => {
            setRemainInMilliSec(getRemainInMilliSec(props.currentTimer));
        }, RenderingInterval)
        return () => clearTimeout(id);
    }, [remainInMilliSec]);
    return (
        <div className={classes.TimerScreen}>
            <Grid container justifyContent="center">
                <span>{minutes}</span>:
                <span>{seconds}</span>
            </Grid>
        </div>
    )
}
export default TimerScreen;