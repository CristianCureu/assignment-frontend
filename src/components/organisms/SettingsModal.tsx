import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  Box,
  Button,
  Grid2,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal from "@components/molecules/CustomModal";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";

import ToastNotification, {
  ToastNotificationProps,
} from "@components/molecules/ToastNotification";
import { useRemoveUserFromProcessMutation } from "@hooks/mutations/useRemoveUserFromProcessMutation";
import { useAssignUserToProcessMutation } from "@hooks/mutations/useAssignUserMutation";
import { userEmailSchema } from "@schemas/processSchema";
import { getProcessUsers } from "@services/userService";
import { userEmail } from "@constants/processFields";
import { User, UserResponse } from "@src/types/userTypes";
import { useUser } from "@contexts/UserProvider";
import Form from "@components/molecules/Form";
import useSearch from "@hooks/useSearch";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
  processId: string;
};

const SettingsModal = ({ open, onClose, processId }: SettingsModalProps) => {
  const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<ToastNotificationProps>({
    open: false,
    message: "",
    severity: "success",
  });
  const { user } = useUser();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["processUsers", processId],
    queryFn: () => getProcessUsers(processId),
  });

  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredUsers,
  } = useSearch(
    users,
    (user: UserResponse, query: string) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  const removeUserMutation = useRemoveUserFromProcessMutation();
  const addUserMutation = useAssignUserToProcessMutation();

  const handleRemoveUser = async () => {
    try {
      await removeUserMutation.mutateAsync({ userId: user._id, processId });
      setSnackbar({
        open: true,
        message: "User removed successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleAddUser = async (formData: User) => {
    try {
      await addUserMutation.mutateAsync({ identifier: formData.email, processId });
      setSnackbar({
        open: true,
        message: "User added successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Invalid email!`,
        severity: "error",
      });
    }
  };

  const handleToastClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error: {error.message}</Typography>;

  return (
    <CustomModal open={open} onClose={onClose}>
      <Container>
        <IconButton onClick={() => onClose()} sx={{ alignSelf: "flex-end", mb: 1 }}>
          <CloseIcon />
        </IconButton>
        <Grid2 container alignItems="center" justifyContent="space-between" width="100%">
          <TextField
            label="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Typography variant="h6" fontWeight="bold">
            Members
          </Typography>
          <Button
            color="error"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddUserModalOpen(true)}
            sx={{ borderRadius: "0.6rem" }}
          >
            Invite
          </Button>
        </Grid2>
        <TableContainer sx={{ my: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: grey[100] }}>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers?.map((user: UserResponse) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleRemoveUser}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {addUserModalOpen && (
        <CustomModal open={addUserModalOpen} onClose={() => setAddUserModalOpen(false)}>
          <Form fields={userEmail} schema={userEmailSchema} onSubmit={handleAddUser}>
            <Button type="submit" variant="contained">
              Invite User
            </Button>
          </Form>
        </CustomModal>
      )}
      {snackbar.open && (
        <ToastNotification
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          handleClose={handleToastClose}
        />
      )}
    </CustomModal>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "80vh",
  width: "80vw",
  overflowY: "auto",
  marginBottom: 40,
  boxSizing: "content-box",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[400] || "#b0b0b0",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[100] || "#e0e0e0",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey[300] || "#c0c0c0",
  },
}));

export default SettingsModal;
