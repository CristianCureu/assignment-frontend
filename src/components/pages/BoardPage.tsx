import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  Box,
  Divider,
  Grid2,
  Input,
  InputAdornment,
  styled,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import FilterUsers from "@components/molecules/FilterUsers";
import TaskComponent from "@components/molecules/Task";
import Draggable from "@components/atoms/Draggable";
import Droppable from "@components/atoms/Droppable";
import { columnStyles } from "@styles/boardStyles";
import { getAllUsers } from "@services/userService";
import { getAllTasks, updateTask } from "@services/taskService";
import Navbar from "@components/molecules/Navbar";
import { Tasks } from "@src/types/taskTypes";
import useSearch from "@hooks/useSearch";
import ToastNotification, {
  ToastNotificationProps,
} from "@components/molecules/ToastNotification";
import Sortable from "@components/atoms/Sortable";

const columnOrder = ["to-do", "in-progress", "review", "completed"];

const columnNames = {
  "to-do": "To Do",
  "in-progress": "In Progress",
  review: "Review",
  completed: "Completed",
};

const BoardPage = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Tasks>({});
  const [activeId, setActiveId] = useState(null);
  const [overItemIndex, setOverItemIndex] = useState(null);
  const [snackbar, setSnackbar] = useState<ToastNotificationProps>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    data: initialTasks,
    isLoading: isLoadingTasks,
    isError: isErrorTasks,
    error: errorTasks,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const {
    searchQuery,
    setSearchQuery,
    filteredItems: searchFilteredTasks,
  } = useSearch(Object.values(tasks).flat(), (task, query: string) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (initialTasks && typeof initialTasks === "object") {
      const groupedTasks = columnOrder.reduce((acc: Tasks, status) => {
        acc[status] = initialTasks[status] || [];
        return acc;
      }, {});
      setTasks(groupedTasks);
      console.log("useEffect");
    }
  }, [initialTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!event.over || !event.over.data.current || !event.over.data.current.containerId) {
      return;
    }
    const {
      id: overId,
      data: {
        current: { containerId: overContainerId },
      },
    } = event.over;

    const items = tasks[overContainerId];

    if (!items) return;

    const index = items.findIndex((item) => item._id === overId);

    if (index !== -1) {
      setOverItemIndex(overId);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    setActiveId(null);
    setOverItemIndex(null);

    if (!over || !over.data.current || !over.data.current.containerId) {
      return;
    }

    const {
      id: taskId,
      data: {
        current: { containerId: sourceContainerId },
      },
    } = active;
    const {
      id: overItemId,
      data: {
        current: { containerId: destinationContainerId },
      },
    } = over;

    if (sourceContainerId === destinationContainerId) {
      const items = tasks[sourceContainerId];

      const oldIndex = items.findIndex((task) => task._id === taskId);
      const newIndex = items.findIndex((task) => task._id === overItemId);

      if (oldIndex === newIndex || newIndex === -1 || oldIndex === -1) {
        return;
      }

      const newItems = arrayMove(items, oldIndex, newIndex);

      setTasks((prev) => ({
        ...prev,
        [sourceContainerId]: newItems,
      }));

      return;
    }

    const sourceTasks = tasks[sourceContainerId];
    const destinationTasks = tasks[destinationContainerId];

    const task = sourceTasks.find((task) => task._id === taskId)!;

    const updatedTask = {
      ...task,
      status: destinationContainerId,
    };

    const newIndex = destinationTasks.findIndex((task) => task._id === overItemId);
    const updatedDestinationTasks = [...destinationTasks];

    if (newIndex !== -1) {
      console.log(newIndex);
      console.log(updatedDestinationTasks);
      updatedDestinationTasks.splice(newIndex, 0, updatedTask);
      console.log(updatedDestinationTasks);
    } else {
      updatedDestinationTasks.push(updatedTask);
    }

    setTasks((prev) => ({
      ...prev,
      [sourceContainerId]: sourceTasks.filter((item) => item._id !== taskId),
      [destinationContainerId]: updatedDestinationTasks,
    }));

    try {
      await updateTask(updatedTask);
      setSnackbar({
        open: true,
        message: `Task: ${task.title} moved from "${columnNames[sourceContainerId]}" to "${columnNames[destinationContainerId]}".`,
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update task:", error);
      setTasks((prev) => ({
        ...prev,
        [sourceContainerId]: [...sourceTasks, task],
        [destinationContainerId]: destinationTasks.filter((item) => item._id !== taskId),
      }));
      setSnackbar({
        open: true,
        message: "Error updating task!",
        severity: "error",
      });
    }
  };

  const filteredTasks = columnOrder.reduce((acc, column) => {
    acc[column] = searchFilteredTasks.filter(
      (task) =>
        task.status === column && (!filters.length || filters.includes(task.person._id))
    );
    return acc;
  }, {} as Tasks);

  useEffect(() => {
    console.log(filteredTasks);
  }, [filteredTasks]);

  const handleToastClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  if (isLoadingTasks || isLoadingUsers)
    return (
      <Navbar>
        <Typography>Loading...</Typography>
      </Navbar>
    );
  if (isErrorTasks)
    return (
      <Navbar>
        <Typography>Error: {errorTasks.message}</Typography>
      </Navbar>
    );
  if (isErrorUsers)
    return (
      <Navbar>
        <Typography>Error: {errorUsers.message}</Typography>
      </Navbar>
    );

  return (
    <Navbar>
      <Container>
        <Typography variant="h5">Front-End Web & Mobile</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid2 container alignItems="center" sx={{ my: 2 }}>
          <Input
            placeholder="Choose something"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ mr: 4 }}
          />
          <FilterUsers users={users} filters={filters} setFilters={setFilters} />
        </Grid2>
        <ColumnsContainer>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            collisionDetection={closestCenter}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              {Object.keys(filteredTasks).map((columnId) => (
                <Droppable
                  key={columnId}
                  id={columnId}
                  hoverBgColor={columnStyles[columnId].backgroundColor}
                >
                  <Grid2
                    container
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{ marginBottom: 4 }}
                  >
                    <Typography>{columnNames[columnId] || columnId}</Typography>
                    <Typography
                      sx={{
                        px: 1.5,
                        bgcolor: columnStyles[columnId].backgroundColor,
                        color: columnStyles[columnId].color,
                        borderRadius: 2,
                        marginLeft: 2,
                      }}
                    >
                      {filteredTasks[columnId].length}
                    </Typography>
                  </Grid2>
                  {filteredTasks[columnId].length === 0 ? (
                    <Typography>Items</Typography>
                  ) : (
                    <SortableContext
                      items={filteredTasks[columnId].map((task) => task._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {filteredTasks[columnId].map((task) => {
                        return (
                          <Sortable
                            key={task._id}
                            id={task._id}
                            containerId={columnId}
                            overItemId={overItemIndex}
                          >
                            <Draggable
                              key={task._id}
                              id={task._id}
                              containerId={columnId}
                            >
                              <TaskComponent task={task} />
                            </Draggable>
                          </Sortable>
                        );
                      })}
                    </SortableContext>
                  )}
                </Droppable>
              ))}
            </Box>
            <DragOverlay>
              {activeId ? (
                <TaskComponent
                  task={searchFilteredTasks.find((task) => task._id === activeId)!}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </ColumnsContainer>
      </Container>
      {snackbar.open && (
        <ToastNotification
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          handleClose={handleToastClose}
        />
      )}
    </Navbar>
  );
};

export default BoardPage;

const Container = styled(Box)({
  padding: 30,
  height: "100vh",
});

const ColumnsContainer = styled(Box)(({ theme }) => ({
  marginTop: 12,
  height: "75vh",
  overflowY: "auto",
  boxSizing: "content-box",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[400],
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));
