import { useLocation, useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import { AppBar, Grid2, Typography, useMediaQuery, useTheme } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import { Logout } from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import { useUser } from "@contexts/UserProvider";
import { navbarRoutes } from "@routes/routes";

type NavbarProps = {
  children: ReactNode | ReactNode[];
};

const drawerWidth = 240;

const Navbar = ({ children }: NavbarProps) => {
  const { clearUser } = useUser();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiListItemIcon-root": {
            color: "white",
          },
          "& .MuiDrawer-paper": {
            backgroundColor: "#04385A",
          },
          "& .MuiListItemText-root .MuiTypography-root": {
            color: "white", // Set all text to white
          },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: "white",
              mx: open ? 0 : "auto",
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {navbarRoutes.map((route) => (
            <ListItem key={route.path} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(route.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={clearUser}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 3 : "auto",
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, width: isMobile ? "80%" : "auto" }}>
        {(location.pathname === "/processes" ||
          location.pathname.startsWith("/process")) && (
          <AppBar
            component="nav"
            sx={{
              position: "relative",
              boxShadow: 2,
              px: 4,
              backgroundColor: "white",
            }}
          >
            <Grid2
              container
              alignItems="center"
              sx={{
                height: "8vh",
              }}
            >
              <Typography variant="h6" sx={{ color: "gray" }}>
                Process
              </Typography>
              {location.pathname.startsWith("/process/") && (
                <>
                  <ChevronRightIcon sx={{ color: "gray", mx: 1 }} />
                  <Typography variant="h6" sx={{ color: "black" }}>
                    {location.state.name}
                  </Typography>
                </>
              )}
            </Grid2>
          </AppBar>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
