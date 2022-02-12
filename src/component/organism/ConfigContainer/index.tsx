import { FC } from "react";

// Material UI
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

// State
import { useRecoilState, useRecoilValue } from "recoil";
import { taskListListState, calendarListState, onlineConfigState, StepList } from "./state";

// interfaces
import { UserConfig } from "domain/value";

// endpoint
import Msg from "component/atom/Msg";

// API
import { useUpdateUserConfig } from "../LoggedInContainer/state";


interface ConfigScreenProps {
  userId: string;
  userConfig: UserConfig;
}

const ConfigContainer: FC<ConfigScreenProps> = (props: ConfigScreenProps) => {
  const userId = props.userId;
  const taskListList = useRecoilValue(taskListListState);
  const calendarList = useRecoilValue(calendarListState);
  const [onlineConfig, setOnlineConfig] = useRecoilState(onlineConfigState);
  const updateUserConfig = useUpdateUserConfig(userId);

  const nextStep = () => {
    if (onlineConfig.step !== StepList.TASKLIST) {
      throw Error("Unexpected Step!");
    }
    const nextState = { ...onlineConfig, step: StepList.CALENDAR };
    setOnlineConfig(nextState);
  };
  const handleChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void =
    (key) => (event) => {
      const target = event.target as HTMLInputElement;
      const nextState = {
        ...onlineConfig,
        [key]: target.value,
      };
      setOnlineConfig(nextState);
    };
  const hundleSubmit: () => void = () => {
    const config: UserConfig = {
      taskListId: onlineConfig.taskListId,
      calendarId: onlineConfig.calendarId,
    };
    updateUserConfig(config).then(() => {
      setOnlineConfig({ ...onlineConfig, step: StepList.SUCCESS })
    }).catch(() => {
      setOnlineConfig({ ...onlineConfig, step: StepList.FAILURE })
    });
  };

  const taskListForm = (
    <div className="taskListForm">
      <FormControl component="label">
        <FormLabel component="label">Select Task List</FormLabel>
        <RadioGroup name="TaskList" value={onlineConfig.taskListId} onChange={handleChange("taskListId")}>
          {taskListList.map((taskList, idx) => {
            return (
              <FormControlLabel
                key={idx}
                value={taskList.id}
                control={<Radio />}
                label={taskList.summary}
                checked={taskList.id === onlineConfig.taskListId}
              />
            );
          })}
        </RadioGroup>
        <Button onClick={nextStep}>Next</Button>
      </FormControl>
    </div>
  );
  const calendarForm = (
    <div className="calendarForm">
      <FormControl component="label">
        <FormLabel component="label">Select Calendar</FormLabel>
        <RadioGroup name="Calendar" value={onlineConfig.calendarId} onChange={handleChange("calendarId")}>
          {calendarList.map((calendar, idx) => {
            return (
              <FormControlLabel
                key={idx}
                value={calendar.id}
                control={<Radio />}
                label={calendar.summary}
                checked={calendar.id === onlineConfig.calendarId}
              />
            );
          })}
        </RadioGroup>
        <Button onClick={hundleSubmit}>Submit</Button>
      </FormControl>
    </div>
  );
  const successScreen = <Msg msg="Successfully Configured Your Calendar and Task List!" />;
  const failureScreen = <Msg msg="Configuration Failure. Please Contact Us." />;
  const content = (() => {
    switch (onlineConfig.step) {
      case StepList.TASKLIST: {
        return taskListForm;
      }
      case StepList.CALENDAR: {
        return calendarForm;
      }
      case StepList.SUCCESS: {
        return successScreen;
      }
      case StepList.FAILURE: {
        return failureScreen;
      }
      default:
        throw Error("Unexpected Step");
    }
  })();

  return <div className="Config">{content}</div>;
};

export default ConfigContainer;
