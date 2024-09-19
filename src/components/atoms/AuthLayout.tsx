import { Box, styled } from "@mui/material";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode | ReactNode[];
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <AuthLayoutContainer>{children}</AuthLayoutContainer>;
};

const AuthLayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background.default,
}));

export default AuthLayout;
