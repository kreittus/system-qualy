/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AlertModal from "@/_components/AlertModal";
import LoadingPage from "@/_components/errors/LoadingPage";
import { AlertModalProps } from "@/types/modals/AlertModalProps";
import { api } from "@/utils/api";
import { defaultValuesDirectorSchema, directorSchema } from "@/utils/validations/directorSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function TpEvents() {
  const [loading, setLoading] = useState(false);
  const [gestor, setGestor] = useState([]);
  const [modalState, setModalState] = useState<AlertModalProps>({ 
    open: false, 
    success: false,
    message: "", 
    redirectPath: "", 
    onClose: () => setModalState((prev: any) => ({ ...prev, open: false })),
  });


  useEffect(() => {
    try {
        async function buscaUsuarios() {
            const response = await api.get('getAllUsuarios');

            setGestor(response.data);

        }

        buscaUsuarios();

    } catch (error) {
        console.error('Erro ao buscar notificações:', error);
    }
  }, []);


  const onSubmit = async (submitData: any) => {
    setLoading(true);

    const information = {
      sigla: submitData.siglaDiretoria,
      descricao: submitData.NomeDiretoria,
      id_usuario_resp: submitData.responsavelDiretoria,  
    };
     
    try {
      const response = await api.post("createDiretorias", information);
      const { status, data: message } = response;
      if(status === 200){
        setModalState({
          open: true,
          success: true,
          message: `${message}`,
          redirectPath: "",
          onClose: () => setModalState((prev) => ({ ...prev, open: false })),
        });

        //Clean the fields of the form later sent data
        reset(defaultValuesDirectorSchema);
      }
    
    }catch(error: any){
      setModalState({
        open: true,
        success: false,
        message: `Ocorreu um erro ao enviar dados para o servidor - Erro: \n${error}`,
        redirectPath: "",
        onClose: () => setModalState((prev) => ({ ...prev, open: false })),
      });
    }finally{
      setLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<directorSchema>({
    resolver: zodResolver(directorSchema),
    defaultValues: defaultValuesDirectorSchema,
  });

  if (loading) {
    return <LoadingPage message="Enviando dados..." />;
  }

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 1,
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          marginBottom={4}
        >
          Diretoria
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* cod tpNot */}
            <Grid item xs={6}>
              <Controller
                name="siglaDiretoria"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Sigla da diretoria"
                    type="string"
                    variant="outlined"
                    placeholder="Digite a sigla"
                    error={!!errors.siglaDiretoria}
                    helperText={errors.siglaDiretoria?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="NomeDiretoria"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Titulo da diretoria"
                    type="string"
                    variant="outlined"
                    placeholder="Digite o titulo"
                    error={!!errors.NomeDiretoria}
                    helperText={errors.NomeDiretoria?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="responsavelDiretoria"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="gestorLabel">Responsavel</InputLabel>
                    <Select
                      {...field}
                      labelId="gestorLabel"
                      label="Responsavel"
                      error={!!errors.responsavelDiretoria}
                    >
                      {gestor.map((gestor:any) => (
                        <MenuItem key={gestor.id } value={gestor.id}>
                          {gestor.user}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.responsavelDiretoria && (
                      <FormHelperText>{errors.responsavelDiretoria.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                {loading ? "Cadastrando..." : "Cadatrar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <AlertModal
        open={modalState.open}
        success={modalState.success}
        message={modalState.message}
        redirectPath={modalState.redirectPath}
        onClose={modalState.onClose}
      />
    </Container>
  );
}
