import { FC } from 'react';
import { makeStyles, Theme, Grid } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInState, userIdState } from "./state";
import LoginButton from "component/shared/LoginButton";
import Toolbar from "component/shared/Toolbar";
import LoggedInContainer from "component/page/Main/LoggedInContainer";
import LoggedOutContainer from "component/page/Main/LoggedOutContainer";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Main: FC = () => {
  const classes = useStyles();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setUserId = useSetRecoilState(userIdState);
  const appTitle = "YosamasuTimer";
  const LoginButtonWithProperty: FC = () => <LoginButton isLoggedIn={isLoggedIn} setUserId={setUserId} />;
  const MainContainer: FC = () => {
    if (isLoggedIn) {
      return <LoggedInContainer />;
    } else {
      return <LoggedOutContainer />;
    }
  };
  return (
    < div className={classes.root} >
      <CssBaseline />
      <Grid container>
        <Grid item xs={12}>
          <Toolbar appTitle={appTitle} LoginButton={LoginButtonWithProperty} />
        </Grid>
        <Grid item xs={12}>
          <main className={classes.content}>
            <MainContainer />
          </main>
        </Grid>
      </Grid>
    </div >
  )
}

export default Main;
