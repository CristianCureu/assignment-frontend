import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import { Navigate, RouteObject } from "react-router-dom";
import { ReactNode } from "react";

import PasswordResetPage from "@components/pages/PasswordResetPage/PasswordResetPage";
import ProcessesPage from "@components/pages/ProcessesPage/ProcessesPage";
import RegisterPage from "@components/pages/RegisterPage/RegisterPage";
import SettingsPage from "@components/pages/SettingsPage/SettingsPage";
import ProcessPage from "@components/pages/ProcessPage/ProcessPage";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LoginPage from "@components/pages/LoginPage/LoginPage";
import ErrorPage from "@components/pages/ErrorPage/ErrorPage";
import BoardPage from "@components/pages/BoardPage";
import PrivateRoute from "@routes/PrivateRoute";
import AuthRoute from "@routes/AuthRoutes";

type CustomRouteObject = RouteObject & {
  private?: boolean;
  label?: string;
  icon?: ReactNode;
  navbar?: boolean;
};

export const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <PrivateRoute element={<Navigate to="/processes" replace />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <AuthRoute element={<LoginPage />} />,
  },
  {
    path: "/register",
    element: <AuthRoute element={<RegisterPage />} />,
  },
  {
    path: "/password-reset",
    element: <AuthRoute element={<PasswordResetPage />} />,
  },
  {
    path: "/processes",
    element: <PrivateRoute element={<ProcessesPage />} />,
    private: true,
    label: "Processes",
    icon: <GridViewIcon />,
  },
  {
    path: "/process/:processId",
    element: <PrivateRoute element={<ProcessPage />} />,
    private: true,
    navbar: false,
    label: "Processes",
  },
  {
    path: "/board",
    element: <PrivateRoute element={<BoardPage />} />,
    private: true,
    label: "Board",
    icon: <PeopleOutlineIcon />,
  },
  {
    path: "/space-settings",
    element: <PrivateRoute element={<SettingsPage />} />,
    private: true,
    label: "Settings",
    icon: <SettingsOutlinedIcon />,
  },
];

export const privateRoutes = routes.filter((route) => route.private);
export const navbarRoutes = privateRoutes.filter((route) => route.navbar !== false);
