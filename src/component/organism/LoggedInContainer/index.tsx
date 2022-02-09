// React
import { FC } from "react";

// Component
import ConfiguredContainer from "component/organism/ConfiguredContainer";
import UnconfiguredContainer from "component/organism/UnconfiguredContainer";


// State
import { useRecoilValue } from "recoil";
import {
  isConfiguredState,
} from "component/organism/LoggedInContainer/state";

const LoggedInContainer: FC = () => {
  const isConfigured = useRecoilValue(isConfiguredState);
  if (isConfigured) {
    return <ConfiguredContainer />;
  } else {
    return <UnconfiguredContainer />;
  }
};

export default LoggedInContainer;
