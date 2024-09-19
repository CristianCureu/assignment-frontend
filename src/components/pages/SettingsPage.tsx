import { useEffect, useState } from "react";

import Navbar from "@components/molecules/Navbar";
import {
  Box,
  Button,
  Divider,
  Grid2,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { blue } from "@mui/material/colors";

import { passwordSettingsFields, profileSettingsFields } from "@constants/settingsFields";
import { passwordSettingsSchema, profileSettingsSchema } from "@schemas/settingsSchema";
import { useUpdateUserMutation } from "@hooks/mutations/useUpdateUserMutation";
import { useUser } from "@contexts/UserProvider";
import Form from "@components/molecules/Form";
import { User } from "@src/types/userTypes";
import ToastNotification, {
  ToastNotificationProps,
} from "@components/molecules/ToastNotification";

const SettingsPage = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("info");
  const [snackbar, setSnackbar] = useState<ToastNotificationProps>({
    open: false,
    message: "",
    severity: "success",
  });

  console.log(user)

  const defaultUsername = user?.email.split("@")[0];

  const defaultValues = {
    username: defaultUsername || "",
    avatar: user?.avatar || "",
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
  };

  const updateUserMutation = useUpdateUserMutation();

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  const handleUpdateUser = async (formData: User) => {
    const userData = { _id: user._id, ...formData };
    console.log(formData);
    try {
      await updateUserMutation.mutateAsync(userData);
      setSnackbar({
        open: true,
        message: "User updated successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error updating user!`,
        severity: "error",
      });
    }
  };

  const handleToastClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <Navbar>
      <Container>
        <Typography variant="h5">Profile</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid2 container>
          <Grid2>
            <Grid2 container alignItems="center" sx={{ color: blue[700] }}>
              <SettingsOutlinedIcon />
              <Typography sx={{ ml: 1 }} variant="body1">
                PROFILE SETTINGS
              </Typography>
            </Grid2>
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={handleTabChange}
              aria-label="profile settings tabs"
              sx={{
                border: "none",
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
                "& .MuiTab-root": {
                  minWidth: "150px",
                  textAlign: "left",
                },
                "& .MuiTab-root.Mui-selected": {
                  color: blue[700],
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              <Tab value="info" label="Info" sx={{ alignSelf: "flex-start" }} />
              <Tab value="security" label="Security" sx={{ alignSelf: "flex-start" }} />
            </Tabs>
          </Grid2>
          <Grid2 container sx={{ ml: 8, height: "80vh" }}>
            <Divider orientation="vertical" sx={{ mr: 8 }} />
            <Box sx={{ width: 500 }}>
              {tab === "info" && (
                <>
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Info
                  </Typography>
                  <Form
                    fields={profileSettingsFields}
                    schema={profileSettingsSchema}
                    onSubmit={handleUpdateUser}
                    defaultValues={defaultValues}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ alignSelf: "flex-end" }}
                    >
                      Save
                    </Button>
                  </Form>
                </>
              )}
              {tab === "security" && (
                <>
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Security Settings
                  </Typography>
                  <Form
                    fields={passwordSettingsFields}
                    schema={passwordSettingsSchema}
                    onSubmit={handleUpdateUser}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ alignSelf: "flex-end" }}
                    >
                      Save
                    </Button>
                  </Form>
                </>
              )}
            </Box>
          </Grid2>
        </Grid2>
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

export default SettingsPage;

const Container = styled(Box)({
  padding: 30,
  height: "100vh",
});
