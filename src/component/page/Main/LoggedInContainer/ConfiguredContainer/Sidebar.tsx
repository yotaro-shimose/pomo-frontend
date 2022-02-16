import { FC } from "react";
import { Divider, List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Task } from "domain/entity";
import { useRecoilValueLoadable } from "recoil";
import { taskListState } from "./state";

interface SideBarProps {
  selectedTaskId: String | null;
  setSelectedTask(task: Task | null): void;
}

const SideBar: FC<SideBarProps> = (props: SideBarProps) => {
  const taskListLoadable = useRecoilValueLoadable(taskListState);
  if (taskListLoadable.state === "hasValue") {
    const taskList = taskListLoadable.contents;
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
              }
              }>
              <ListItemText primary={task.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );
  } else {
    return null;
  };
}

export default SideBar;
export type { SideBarProps };
