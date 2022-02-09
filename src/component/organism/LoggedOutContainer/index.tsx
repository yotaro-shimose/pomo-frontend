import { FC } from "react";
import { Typography, Grid } from "@material-ui/core";

const LoggedOutContainer: FC = () => {
  return (
    <div>
      <Grid container justifyContent="center">
        <Typography>
          <h3>You have to log in first!</h3>
        </Typography>

      </Grid>
    </div>
  );
};

export default LoggedOutContainer;
