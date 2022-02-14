// React
import { FC } from "react";

import { makeStyles, Theme, Grid } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

interface TimerScreenProps {
    minutes: string,
    seconds: string
}

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        TimerScreen: {
            fontSize: "9rem"
        }
    })
);

const TimerScreen: FC<TimerScreenProps> = (props) => {

    const classes = useStyles();
    return (
        <div className={classes.TimerScreen}>
            <Grid container justifyContent="center">
                <span>{props.minutes}</span>:
                <span>{props.seconds}</span>
            </Grid>
        </div>
    )
}
export default TimerScreen;