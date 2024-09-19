import { Card, useMediaQuery, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

type CustomModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

const CustomModal = ({ children, open, onClose }: CustomModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          bgcolor: "background.paper",
          p: 4,
          position: "absolute",
          top: "50%",
          left: isMobile ? "50%" : "calc(100vw - 481px)",
          transform: isMobile ? "translate(-50%, -50%)" : "translate(0, -50%)",
          border: "none ",
          outline: "none",
          width: isMobile ? "90%" : "auto",
        }}
      >
        {children}
      </Card>
    </Modal>
  );
};

export default CustomModal;
