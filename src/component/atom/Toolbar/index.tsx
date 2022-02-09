import { FC } from "react";
import { makeStyles, Theme, Toolbar as MaterialToolbar, Typography, AppBar } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

interface TitledToolbarProps {
  appTitle: string;
  LoginButton: FC;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1,
      zIndex: theme.zIndex.drawer + 1,
    },
    barRight: {
      flexGrow: 1,
    },
  })
);

const Toolbar: FC<TitledToolbarProps> = (props) => {
  const appTitle = props.appTitle;

  const LoginButton = props.LoginButton;
  const classes = useStyles();

  return (
    <div className="TitledToolBar">
      <AppBar position="fixed" className={classes.appBar}>
        <MaterialToolbar>
          <Typography variant="h6" noWrap>
            {appTitle}
          </Typography>
          <div className={classes.barRight} />
          <LoginButton />
        </MaterialToolbar>
      </AppBar>
    </div>
  );
};

export default Toolbar;
