'use client';

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

interface NotFoundProps {
  message: string; // Mensagem personalizada para exibição
  onBack?: () => void; // Função opcional para o botão "Voltar"
}

const NotFound: React.FC<NotFoundProps> = ({ message, onBack }) => {
  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {message}
        </Typography>
        {onBack && (
          <Button
            variant="contained"
            color="primary"
            onClick={onBack}
            sx={{ mt: 2 }}
          >
            Voltar
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default NotFound;
