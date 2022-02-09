import { FC } from 'react';

interface MsgScreenProps {
  msg: string,
}

const Msg: FC<MsgScreenProps> = (props) => {
  return (
    <h1>{props.msg}</h1>
  )
};

export default Msg;