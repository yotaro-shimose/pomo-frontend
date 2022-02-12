import { FC } from 'react';
import ConfigContainer from "component/organism/ConfigContainer";
import { useRecoilValue } from "recoil";
import { userConfigState } from "component/organism/LoggedInContainer/state";

interface UnconfiguredContainerProps {
  userId: string;
}

const UnconfiguredContainer: FC<UnconfiguredContainerProps> = (props) => {
  const userId = props.userId;
  const userConfig = useRecoilValue(userConfigState);
  return <ConfigContainer userId={userId} userConfig={userConfig} />
}

export default UnconfiguredContainer;