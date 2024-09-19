import { useDroppable } from "@dnd-kit/core";

type DroppableContainerProps = {
  id: string;
  children: React.ReactNode;
};

const Droppable = ({ id, children }: DroppableContainerProps) => {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
};

export default Droppable;
