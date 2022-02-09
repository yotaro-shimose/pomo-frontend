import { FC } from "react";
import Drawer from "@material-ui/core/Drawer";
import { Divider, List, makeStyles, Theme, Toolbar } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles } from "@material-ui/core/styles";
import { Task } from "domain/entity";
import { useRecoilValue } from "recoil";
import { taskListState } from "component/organism/ConfiguredContainer/state";

interface SideBarProps {
  drawerWidth: number;
  selectedTaskId: String | null;
  setSelectedTask(task: Task | null): void;
  setTimerConfig(timerConfig: number | null): void;
}

const SideBar: FC<SideBarProps> = (props: SideBarProps) => {
  const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
      drawer: {
        width: props.drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: props.drawerWidth,
      },
      drawerContainer: {
        overflow: "auto",
      },
    })
  );
  const classes = useStyles();
  const taskList = useRecoilValue(taskListState);
  const selectedTaskId = props.selectedTaskId;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
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
    </Drawer>
  );
};

export default SideBar;
export type { SideBarProps };
