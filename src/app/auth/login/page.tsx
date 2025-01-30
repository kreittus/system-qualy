/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { defaultValuesLoginSchema, LoginSchema, loginSchema } from '@/utils/validations/loginSchema';
import { api } from '@/utils/api';
import { AlertModalProps } from '@/types/modals/AlertModalProps';
import LoadingPage from '@/_components/errors/LoadingPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import AlertModal from '@/_components/AlertModal';
import { useAuth } from '@/context/AuthContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<AlertModalProps>({
    open: false,
    success: false,
    message: "",
    redirectPath: "",
    onClose: () => setModalState((prev) => ({ ...prev, open: false })), //Set the open state to false to close the modal
  });

  // React Hook Form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValuesLoginSchema,
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (submitData: LoginSchema) => {
    setLoading(true);

    // Mapping data zod to send to API
    const mappedData = {
      user: submitData.username,
      pass: submitData.password
    }
    
    try {
      const response = await api.post("authenticate", mappedData);
      const { status, data } = response;

      // If login is successful, I set the token, username and userId in the cookies but in API I pass just the token at file: /src/utils/api.ts
      if (status === 200) {
        login(data?.token, data?.user, data?.id_user);

        setModalState({
          open: true,
          success: true,
          message: `${data?.message}`,
          redirectPath: "/system",
          onClose: () => setModalState((prev) => ({ ...prev, open: false })),
        });
        reset(defaultValuesLoginSchema);
      }
    } catch (error: any) {
      setModalState({
        open: true,
        success: false,
        message: `Ocorreu um erro ao fazer login: ${error.message}`,
        redirectPath: "",
        onClose: () => setModalState((prev) => ({ ...prev, open: false })), 
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage message="Realizando login..." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'white',
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: 400,
            border: '1px solid #fff4e3',
          }}
        >
          <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Login
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Bem-vindo ao Sistema de Qualidade
          </Typography>

          {/* Campo de Usuário */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Usuário"
                placeholder="Entre com seu usuário"
                variant="outlined"
                sx={{ mb: 3 }}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          {/* Campo de Senha */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Senha"
                placeholder="Entre com a sua senha"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                sx={{ mb: 3 }}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              bgcolor: '#1976d2',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              py: 1.5,
              mb: 2,
              ':hover': { bgcolor: '#115293' },
            }}
            type="submit"
          >
            {loading ? 'Entrando...' : 'Login'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Não tem uma conta?{' '}
              <Link
                href="#"
                underline="hover"
                onClick={() => router.push('/auth/register')}
                sx={{ color: '#1976d2', fontWeight: 'bold' }}
              >
                Registre-se
              </Link>
            </Typography>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: '#1976d2',
                fontWeight: 'thin',
                display: 'block',
                mt: 2,
              }}
            >
              Esqueci minha senha
            </Link>
          </Box>
        </Box>

        {/* Alert modal for success or error messages */}
        <AlertModal
          open={modalState.open}
          success={modalState.success}
          message={modalState.message}
          redirectPath={modalState.redirectPath}
          onClose={modalState.onClose}
        />
      </Container>
    </form>
  );
};

export default LoginPage;
