'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string; // Mensagem opcional para exibir junto ao loader
}

const LoadingPage: React.FC<LoadingProps> = ({ message = 'Carregando...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingPage;
