import { useState } from "react";

import { TransitionProps } from "@mui/material/transitions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Slide } from "@mui/material";
import { AlertColor } from "@mui/material";
import { ReactNode } from "react";

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
    setState({
      ...state,
      open: false,
    });
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
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default ToastNotification;
