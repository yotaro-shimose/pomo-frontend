import { FC } from "react";
import { Divider, List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Task } from "domain/entity";
import { useRecoilValue } from "recoil";
import { taskListState } from "component/organism/ConfiguredContainer/state";

interface SideBarProps {
  selectedTaskId: String | null;
  setSelectedTask(task: Task | null): void;
  setTimerConfig(timerConfig: number | null): void;
}

const SideBar: FC<SideBarProps> = (props: SideBarProps) => {
  const taskList = useRecoilValue(taskListState);
  const selectedTaskId = props.selectedTaskId;

  return (
    <div >
      <List>
        {taskList.map((task, index) => (
          <ListItem
            button key={index}
            selected={task.id === selectedTaskId}
            onClick={() => {
              props.setSelectedTask(task);
              props.setTimerConfig(null);
            }
            }>
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};
export default SideBar;
export type { SideBarProps };
