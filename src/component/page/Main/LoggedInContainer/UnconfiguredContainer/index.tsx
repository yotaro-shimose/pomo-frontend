import { FC } from 'react';
import ConfigContainer from "component/page/Main/LoggedInContainer/UnconfiguredContainer/ConfigContainer";
import { useRecoilValue } from "recoil";
import { userConfigState } from "component/page/Main/LoggedInContainer/state";

interface UnconfiguredContainerProps {
  userId: string;
}

const UnconfiguredContainer: FC<UnconfiguredContainerProps> = (props) => {
  const userId = props.userId;
  const userConfig = useRecoilValue(userConfigState);
  return <ConfigContainer userId={userId} userConfig={userConfig} />
}

export default UnconfiguredContainer;