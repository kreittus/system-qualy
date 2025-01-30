import React from "react";
import { Modal, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { AlertModalProps } from "@/types/modals/AlertModalProps";
import SuccessAnimation from "./animations/statusAnimation";

const AlertModal: React.FC<AlertModalProps> = ({ open, onClose, success, message, redirectPath }) => {
  const router = useRouter();

  const handleAnimationComplete = () => {
    if(redirectPath) return router.push(redirectPath);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {}}  //Blocking the close 
      disableEscapeKeyDown  //Blocking the escape key to close
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",         
          maxWidth: 250,         
          maxHeight: "80vh",     //Max height of the modal content to avoid overflow
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          textAlign: "center",
          overflowY: "auto",     //Scroll content if it overflows
        }}
      >
        <SuccessAnimation optionsProps={{
            loop: false,
            autoplay: true,
            onAnimationComplete: handleAnimationComplete,
            message: message,
            status: success,
          }}
        />
      </Box>
    </Modal>
  );
};

export default AlertModal;
