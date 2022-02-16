import { FC } from "react";
import { Toolbar as MaterialToolbar, Typography, AppBar, Grid } from "@material-ui/core";

interface TitledToolbarProps {
  appTitle: string;
  LoginButton: FC;
}

const Toolbar: FC<TitledToolbarProps> = (props) => {
  const appTitle = props.appTitle;

  const LoginButton = props.LoginButton;

  return (
    <div className="TitledToolBar">
      <AppBar position="relative">
        <MaterialToolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6" noWrap>
                <h3>{appTitle}</h3>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <LoginButton />
            </Grid>
          </Grid>
        </MaterialToolbar>
      </AppBar>
    </div >
  );
};

export default Toolbar;
// 'absolute'
//   | 'fixed'
//   | 'relative'
//   | 'static'
//   | 'sticky'