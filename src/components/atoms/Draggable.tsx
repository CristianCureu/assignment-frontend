import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box, Typography } from "@mui/material";
import React from "react";

type DraggableProps = {
  id: string;
  containerId: string;
  children: React.ReactNode;
};

const Draggable = ({ id, containerId, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { containerId },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    visibility: isDragging ? "hidden" : "visible",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;
