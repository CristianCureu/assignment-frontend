import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

type DroppableContainerProps = {
  id: string;
  hoverBgColor?: string;
  children: React.ReactNode;
};

const Droppable = ({ id, hoverBgColor, children }: DroppableContainerProps) => {
  const { setNodeRef, isOver, active, over } = useDroppable({ id });

  const sourceContainerId = active?.data.current.containerId;
  const destinationContainerId = over?.id;

  const isCurrentContainer = sourceContainerId === destinationContainerId;

  const style: React.CSSProperties = {
    backgroundColor: isOver && !isCurrentContainer ? hoverBgColor : "#f5f5f5",
    padding: 10,
    minHeight: 200,
    flex: 1,
  };

  return (
    <Box ref={setNodeRef} style={style}>
      {children}
    </Box>
  );
};

export default Droppable;
