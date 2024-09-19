import { useNavigate } from "react-router-dom";
import { AlertColor } from "@mui/material";
import { useState } from "react";

import WorkspaceDetailsForm from "@components/organisms/WorkspaceDetailsForm";
import UserCredentialsForm from "@components/organisms/UserCredentialsForm";
import { UserCredentialsData, WorkspaceData } from "@src/types/formTypes";
import ToastNotification from "@components/molecules/ToastNotification";
import AuthBackground from "@components/molecules/AuthBackground";
import AuthLayout from "@components/atoms/AuthLayout";
import { registerSVGs } from "@constants/svgProps";
import { register } from "@services/authService";

const initialData = {
  workspace: "",
  email: "",
  termsAndConditions: false,
  personalData: false,
};

const RegisterPage = () => {
  const [step, setStep] = useState<number>(1);
  const [registetWorkspaceData, setRegistetWorkspaceData] =
    useState<WorkspaceData>(initialData);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
    navigateTo: string;
  }>({
    open: false,
    message: "",
    severity: "success",
    navigateTo: "",
  });
  const navigate = useNavigate();

  const handleWorkspaceSubmit = (formData: WorkspaceData) => {
    setRegistetWorkspaceData((prevData) => ({ ...prevData, ...formData }));
    setStep(2);
  };

  const handleUserCredentialsSubmit = async (
    formData: UserCredentialsData & WorkspaceData
  ) => {
    const updatedRegisterData = { ...registetWorkspaceData, ...formData };

    try {
      const { success, message } = await register(updatedRegisterData);
      if (success) {
        setSnackbar({
          open: true,
          message: message || "Account successfully created!",
          severity: "success",
          navigateTo: "/login",
        });
        setRegistetWorkspaceData(initialData);
      } else {
        setSnackbar({
          open: true,
          message: message || "Registration failed!",
          severity: "error",
          navigateTo: "",
        });
      }
    } catch (error) {
      console.log("RegisterPage::handleUserCredentialsSubmit: ", error);
      setSnackbar({
        open: true,
        message: "Registration failed!",
        severity: "error",
        navigateTo: "",
      });
    }
  };

  const handleToastClose = () => {
    if (snackbar.navigateTo) {
      navigate(snackbar.navigateTo);
    }
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <AuthLayout>
      {step === 1 ? (
        <WorkspaceDetailsForm onSubmit={handleWorkspaceSubmit} />
      ) : (
        <UserCredentialsForm onSubmit={handleUserCredentialsSubmit} />
      )}
      <AuthBackground bgColor="#2CCFBC1A" svgProps={registerSVGs} />
      <ToastNotification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleToastClose}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
