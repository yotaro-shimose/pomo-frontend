// React
import { FC, useLayoutEffect } from "react";

// Component
import ConfiguredContainer from "component/organism/ConfiguredContainer";
import UnconfiguredContainer from "component/organism/UnconfiguredContainer";


// State
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isConfiguredState, userConfigState
} from "component/organism/LoggedInContainer/state";
import { fetchUserConfig } from "infrastructure/backend_api";
import { UserConfig } from "domain/value";

interface LoggedInContainerProps {
  userId: string;
}

const LoggedInContainer: FC<LoggedInContainerProps> = (props) => {
  const userId = props.userId;
  const setUserConfig = useSetRecoilState(userConfigState);
  useLayoutEffect(() => {
    fetchUserConfig(userId).then((userConfig: UserConfig) => {
      setUserConfig(userConfig);
    }).catch((error: any) => {
      console.log(error);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <InnerLoggedInContainer userId={userId} />
}

interface InnerLoggedInContainerProps {
  userId: string;
}

const InnerLoggedInContainer: FC<InnerLoggedInContainerProps> = (props) => {
  const userId = props.userId;
  const isConfigured = useRecoilValue(isConfiguredState);
  if (isConfigured) {
    return <ConfiguredContainer userId={userId} />;
  } else {
    return <UnconfiguredContainer userId={userId} />;
  }
};

export default LoggedInContainer;
