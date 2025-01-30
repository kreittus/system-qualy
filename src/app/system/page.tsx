'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

const SistemaPage: React.FC = () => {
  return (
    <Container maxWidth="md" className='items-center justify-center mt-24'>
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
          padding: 4,
        }}
      >
        {/* Título */}
        <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
          Bem-vindo ao Sistema
        </Typography>

        {/* Subtítulo */}
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Gerencie suas informações de maneira eficiente e moderna.
        </Typography>

        {/* Botões de Ação
        <Stack
          spacing={2}
          sx={{ marginTop: 4 }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ textTransform: 'none', px: 4 }}
          >
            Sobre o Sistema
          </Button>
        </Stack> */}
      </Box>
    </Container>
  );
};

export default SistemaPage;
