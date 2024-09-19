import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

import TaskComponent from "@components/molecules/Task";

const Sortable = ({
  id,
  task,
  containerId,
}: {
  id: string;
  task: any;
  containerId: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id,
      data: { containerId },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskComponent task={task} />
    </Box>
  );
};

export default Sortable;
