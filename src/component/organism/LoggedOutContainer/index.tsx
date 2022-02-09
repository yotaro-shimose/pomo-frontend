import { FC } from "react";
import { Toolbar, Typography } from "@material-ui/core";

const LoggedOutContainer: FC = () => {
  return (
    <div>
      <Toolbar />
      <Typography>
        <h3>You have to log in first!</h3>
      </Typography>
    </div>
  );
};

export default LoggedOutContainer;
