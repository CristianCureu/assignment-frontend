import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Card,
  Grid2 as Grid,
  Grid2,
  styled,
  Typography,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import AddIcon from "@mui/icons-material/Add";

import { useCreateProcessMutation } from "@hooks/mutations/useCreateProcessMutation";
import { createProcessFields } from "@constants/processFields";
import CustomModal from "@components/molecules/CustomModal";
import { getUserProcesses } from "@services/userService";
import { processSchema } from "@schemas/processSchema";
import Navbar from "@components/molecules/Navbar";
import { useUser } from "@contexts/UserProvider";
import Form from "@components/molecules/Form";
import { Process } from "@src/types/apiTypes";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ToastNotification, {
  ToastNotificationProps,
} from "@components/molecules/ToastNotification";

const ProcessesPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<ToastNotificationProps>({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    data: processes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProcesses"],
    queryFn: () => getUserProcesses(user._id),
    enabled: !!user._id,
  });

  const createProcessMutation = useCreateProcessMutation();

  const handleCreateProcess = async (process: Process) => {
    try {
      await createProcessMutation.mutateAsync(process);
      setSnackbar({
        open: true,
        message: "Process created successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Process already exists!",
        severity: "error",
      });
    }
  };

  const handleToastClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  if (isLoading)
    return (
      <Navbar>
        <Typography>Loading...</Typography>
      </Navbar>
    );
  if (isError)
    return (
      <Navbar>
        <Typography>Error: {error.message}</Typography>
      </Navbar>
    );

  return (
    <Navbar>
      <Container>
        <Typography variant="h4" fontWeight="bold">
          Welcome, {user.name}
        </Typography>
        <Typography sx={{ marginTop: 4, marginBottom: 4 }}>
          Work with your team mates, take track of your process and close all tasks
        </Typography>
        <Grid container spacing={4}>
          <ProcessCard
            variant="outlined"
            sx={{ border: "2px dashed #cfcfcf" }}
            onClick={() => setModalOpen(true)}
          >
            <AddIcon />
            <Typography sx={{ m: 2 }} variant="body2">
              Create Process
            </Typography>
          </ProcessCard>
          {processes?.map((process: Process) => (
            <ProcessCard
              key={process.id}
              variant="outlined"
              sx={{
                backgroundColor: process.color,
              }}
              onClick={() => navigate(`/process/${process.id}`, { state: process })}
            >
              <StyledIcon sx={{ color: "white" }}>
                {process.private ? <LockIcon /> : <LockOpenIcon />}
              </StyledIcon>
              <Typography sx={{ m: 2, color: "white" }} variant="body2" fontWeight="bold">
                {process.name}
              </Typography>
            </ProcessCard>
          ))}
        </Grid>
      </Container>
      <CustomModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Typography
          id="modal-modal-title"
          variant="body1"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Create a new process
        </Typography>
        <Grid2 sx={{ width: 500 }}>
          <Form
            onSubmit={handleCreateProcess}
            fields={createProcessFields}
            schema={processSchema}
          >
            <Grid2 alignSelf="flex-end">
              <Button onClick={() => setModalOpen(false)} variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ ml: 2, backgroundColor: teal["A700"] }}
              >
                Create
              </Button>
            </Grid2>
          </Form>
        </Grid2>
      </CustomModal>
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

export default ProcessesPage;

const Container = styled(Box)({
  padding: 20,
  backgroundColor: "#F6F8FA",
  height: "92vh",
});

const ProcessCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 150,
  height: 150,
  position: "relative",
  cursor: "pointer",
});

const StyledIcon = styled(Box)({
  position: "absolute",
  transform: "scale(0.8)",
  left: 10,
  top: 10,
});
