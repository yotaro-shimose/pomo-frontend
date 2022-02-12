// React
import { FC } from "react";

// Component
import ConfiguredContainer from "component/organism/ConfiguredContainer";
import UnconfiguredContainer from "component/organism/UnconfiguredContainer";


// State
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  isConfiguredState, userConfigState
} from "component/organism/LoggedInContainer/state";
import { userIdState } from "component/page/Main/state";



const LoggedInContainer: FC = () => {
  const userId = useRecoilValue(userIdState);
  const userConfigLoadable = useRecoilValueLoadable(userConfigState);
  const isConfiguredLoadable = useRecoilValueLoadable(isConfiguredState);
  if (userConfigLoadable.state == "hasValue" && isConfiguredLoadable.state == "hasValue") {
    const isConfigured = isConfiguredLoadable.contents;
    if (isConfigured) {
      return <ConfiguredContainer userId={userId} />;
    } else {
      return <UnconfiguredContainer userId={userId} />;
    }
  } else {
    return null
  }
}

export default LoggedInContainer;
