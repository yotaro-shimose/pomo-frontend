import { FC } from 'react';
import ConfigContainer from "component/organism/ConfigContainer";
import { useRecoilState } from "recoil";
import { userConfigState } from "component/organism/LoggedInContainer/state";
const UnconfiguredContainer: FC = () => {
  const [userConfig, setUserConfig] = useRecoilState(userConfigState);
  return <ConfigContainer userConfig={userConfig} setUserConfig={setUserConfig} />
}

export default UnconfiguredContainer;