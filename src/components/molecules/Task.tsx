import { Avatar, Card, Typography } from "@mui/material";
import { Task } from "@src/types/taskTypes";
import { stringAvatar } from "@utils/stringAvatar";

type TaskProps = {
  task: Task;
};

const taskProirityIcons = {
  urgent: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icons/priority/urgent">
        <circle id="Ellipse 7" cx="7" cy="17" r="3" fill="#DB54FD"></circle>
        <circle id="Ellipse 8" cx="17" cy="17" r="3" fill="#DB54FD"></circle>
        <circle id="Ellipse 9" cx="7" cy="7" r="3" fill="#DB54FD"></circle>
        <circle id="Ellipse 10" cx="17" cy="7" r="3" fill="#DB54FD"></circle>
      </g>
    </svg>
  ),
  high: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icons/priority/high">
        <circle id="Ellipse 7" cx="7" cy="17" r="3" fill="#FD5461"></circle>
        <circle id="Ellipse 8" cx="17" cy="17" r="3" fill="#FD5461"></circle>
        <circle id="Ellipse 10" cx="12" cy="7" r="3" fill="#FD5461"></circle>
      </g>
    </svg>
  ),
  medium: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icons/priority/medium">
        <circle id="Ellipse 7" cx="7" cy="12" r="3" fill="#FFAB2A"></circle>
        <circle id="Ellipse 8" cx="17" cy="12" r="3" fill="#FFAB2A"></circle>
      </g>
    </svg>
  ),
  low: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icons/priority/low">
        <circle id="Ellipse 8" cx="12" cy="12" r="3" fill="#29C293"></circle>
      </g>
    </svg>
  ),
};

const TaskComponent = ({ task }: TaskProps) => (
  <Card
    sx={{
      padding: 2,
      marginBottom: 2,
      backgroundColor: "#fff",
      borderRadius: 1,
      boxShadow: 1,
      cursor: "pointer",
    }}
  >
    <Typography>{taskProirityIcons[task.priority]}</Typography>
    <Typography variant="subtitle1">{task.title}</Typography>
    <Avatar
      {...stringAvatar(`${task.person.name} ${task.person.surname}`)}
      sx={{ transform: "scale(0.6)", right: 8 }}
    />
  </Card>
);

export default TaskComponent;
