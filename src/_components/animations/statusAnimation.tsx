import React from "react";
import successAnimationJSON from "@/lotties/CheckSuccess.json";
import errorAnimationJSON from "@/lotties/CheckError.json"; 
import Lottie from "lottie-react";
import { Box, Typography } from "@mui/material";

interface SuccessAnimationProps {
  optionsProps: {
    loop?: boolean;
    autoplay?: boolean;
    message?: string; 
    onAnimationComplete?: () => void; 
    status: boolean; 
  };
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ optionsProps }) => {
  const { loop = false, autoplay = true, message, onAnimationComplete, status } = optionsProps;

  // Escolha da animação e cor do texto com base no status
  const animationFile = status ? successAnimationJSON : errorAnimationJSON;
  const textColor = status ? "success.main" : "error.main";

  return (
    <Box sx={{ textAlign: "center" }}>
      <Lottie
        animationData={animationFile} 
        loop={loop}
        autoplay={autoplay}
        onComplete={onAnimationComplete}
      />
      <Typography variant="h6" color={textColor} sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default SuccessAnimation;
