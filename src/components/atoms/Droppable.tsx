import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type DroppableContainerProps = {
  id: string;
  hoverBgColor?: string;
  children: React.ReactNode;
};

const Droppable = ({ id, hoverBgColor, children }: DroppableContainerProps) => {
  const { setNodeRef, active, over } = useDroppable({ id });

  const sourceContainerId = active?.data?.current?.containerId || null;
  const destinationContainerId = over?.data?.current?.containerId || null;

  const isCurrentContainer = sourceContainerId === destinationContainerId;

  const isOver = id === destinationContainerId;

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
