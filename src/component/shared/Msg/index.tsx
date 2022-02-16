import { Typography } from '@material-ui/core';
import { FC } from 'react';

interface MsgScreenProps {
  msg: string,
}

const Msg: FC<MsgScreenProps> = (props) => {
  return (
    <Typography>
      <h3>{props.msg}</h3>
    </Typography>
  )
};

export default Msg;