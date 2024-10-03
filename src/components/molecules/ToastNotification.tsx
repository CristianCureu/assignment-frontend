import { ReactNode } from "react";
import { useState } from "react";

import { TransitionProps } from "@mui/material/transitions";
import { IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material";
import Alert from "@mui/material/Alert";

export type ToastNotificationProps = {
  message: ReactNode;
  hideDuration?: number;
  severity: AlertColor;
  open: boolean;
  handleClose?: any;
};

type StateProps = {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
};

const ToastNotification = ({
  open,
  message,
  hideDuration = 3000,
  severity,
  handleClose,
}: ToastNotificationProps) => {
  const [state, setState] = useState<StateProps>({
    open: open,
    Transition: Slide,
  });

  const onClose = () => {
    setState((prevState) => ({
      ...prevState,
      open: false,
    }));
    handleClose();
  };

  return (
    <Snackbar
      open={open}
      key={state.Transition.name}
      TransitionComponent={state.Transition}
      autoHideDuration={hideDuration}
      onClose={(_, reason) => {
        if (reason !== "clickaway") {
          onClose();
        }
      }}
    >
      <Alert severity={severity}>
        {message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
          sx={{ ml: 2 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
