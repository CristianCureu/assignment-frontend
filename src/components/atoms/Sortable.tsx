import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

import { UniqueIdentifier } from "@dnd-kit/core";
import { ReactNode } from "react";

const Sortable = ({
  id,
  containerId,
  overItemId,
  children,
}: {
  id: string;
  containerId: string;
  overItemId: UniqueIdentifier | null;
  children: ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    active,
    over,
  } = useSortable({
    id,
    data: { containerId },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  const isOver =
    id !== active?.id &&
    overItemId === over?.id &&
    containerId === over?.data.current.containerId;

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isOver &&
        id === overItemId &&
        active?.data.current.containerId !== containerId && (
          <Box
            sx={{
              height: over?.rect.height,
              width: over?.rect.width,
              border: "2px dashed #1976d2",
              borderRadius: "8px",
              mb: 2,
              opacity: 0,
              animation: "fadeIn 0.3s forwards",
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0,
                  transform: "scale(0.95)",
                },
                "100%": {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
            }}
          />
        )}
      {children}
    </Box>
  );
};

export default Sortable;
