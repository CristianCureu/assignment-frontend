import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import { Navigate, RouteObject } from "react-router-dom";
import { ReactNode } from "react";


import ProcessesPage from "@components/pages/ProcessesPage/ProcessesPage";
import ProcessPage from "@components/pages/ProcessPage/ProcessPage";
import PasswordResetPage from "@components/pages/PasswordResetPage";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LoginPage from "@components/pages/LoginPage/LoginPage";
import RegisterPage from "@components/pages/RegisterPage";
import ErrorPage from "@components/pages/ErrorPage";
import PrivateRoute from "@routes/PrivateRoute";
import AuthRoute from "@routes/AuthRoutes";
import BoardPage from "@components/pages/BoardPage";
import SettingsPage from "@components/pages/SettingsPage";

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
  },
  {
    path: "/login",
    element: <AuthRoute element={<LoginPage />} />,
    errorElement: <ErrorPage />,
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
