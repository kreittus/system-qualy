'use client';

import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/login'); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Bem-vindo ao Sistema de Qualidade
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ marginBottom: 3 }}
        >
          Gerencie seus dados de forma simples, rápida e eficiente.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: '8px',
            fontSize: '1rem',
          }}
        >
          Começar
        </Button>
        <Typography variant="body1" component="p" sx={{ marginTop: 8 }}>
          Desenvolvido pela equipe <strong>TIC</strong> da Fundhospar
        </Typography>
      </Container>
    </Box>
  );
}
