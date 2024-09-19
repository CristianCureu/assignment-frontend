import {
  AlertColor,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { useState } from "react";

import ToastNotification from "@components/molecules/ToastNotification";
import AuthBackground from "@components/molecules/AuthBackground";
import { AuthBox, CyanButton } from "@styles/authStyles";
import AuthLayout from "@components/atoms/AuthLayout";
import { loginFields } from "@constants/authFields";
import AuthTitle from "@components/atoms/AuthTitle";
import { loginSchema } from "@schemas/authSchema";
import { LoginData } from "@src/types/formTypes";
import { useUser } from "@contexts/UserProvider";
import { loginSVGs } from "@constants/svgProps";
import Form from "@components/molecules/Form";

const LoginPage = () => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const { login } = useUser();

  const handleLogin = async (formData: LoginData) => {
    try {
      await login(formData);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Login failed!",
        severity: "error",
      });
      console.log("LoginPage::handleLogin: ", error);
    }
  };

  const handleToastClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <AuthLayout>
      <AuthBox>
        <AuthTitle title="Log in" description="Thanks to come back to Coraly" />
        <Form fields={loginFields} schema={loginSchema} onSubmit={handleLogin}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <Box>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
            </Box>
            <Box>
              <Link to="/password-reset">
                <CyanButton>Forgot password</CyanButton>
              </Link>
            </Box>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: blue[900],
              "&:hover": { backgroundColor: blue[700] },
            }}
          >
            Login
          </Button>
          <Grid container alignItems="center" sx={{ marginTop: 2 }}>
            <Typography>Don't have an account yet?</Typography>
            <Link to="/register">
              <CyanButton>Sign up</CyanButton>
            </Link>
          </Grid>
        </Form>
      </AuthBox>
      <AuthBackground svgProps={loginSVGs} />
      <ToastNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleToastClose}
      />
    </AuthLayout>
  );
};

export default LoginPage;
