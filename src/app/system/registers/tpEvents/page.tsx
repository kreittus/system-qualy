/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AlertModal from "@/_components/AlertModal";
import LoadingPage from "@/_components/errors/LoadingPage";
import { AlertModalProps } from "@/types/modals/AlertModalProps";
import { api } from "@/utils/api";

import {
  tpEventsSchema,
  defaultValuesTpEventsSchema,
} from "@/utils/validations/tpEventsSchema";
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
      codigo: submitData.codigoTpNotificacao,
      titulo: submitData.tituloTpNotificacao,
      descricao:  submitData.descTipo,  
      gestor_id:  submitData.gestor
    };
     
    try {
      const response = await api.post("createTpNotificacao", information);
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
        reset(defaultValuesTpEventsSchema);
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
  } = useForm<tpEventsSchema>({
    resolver: zodResolver(tpEventsSchema),
    defaultValues: defaultValuesTpEventsSchema,
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
          Tipo de evento
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* cod tpNot */}
            <Grid item xs={3}>
              <Controller
                name="codigoTpNotificacao"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Código"
                    type="string"
                    variant="outlined"
                    placeholder="Digite o código"
                    error={!!errors.codigoTpNotificacao}
                    helperText={errors.codigoTpNotificacao?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={9}>
              <Controller
                name="tituloTpNotificacao"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Titulo do tipo de evento"
                    type="string"
                    variant="outlined"
                    placeholder="Digite o titulo"
                    error={!!errors.tituloTpNotificacao}
                    helperText={errors.tituloTpNotificacao?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="descTipo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Descrição do tipo de evento"
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Descreva o evento"
                    error={!!errors.descTipo}
                    helperText={errors.descTipo?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="gestor"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="gestorLabel">Getor da qualidade</InputLabel>
                    <Select
                      {...field}
                      labelId="gestorLabel"
                      label="Gestor da qualidade"
                      error={!!errors.gestor}
                    >
                      {gestor.map((gestor:any) => (
                        <MenuItem key={gestor.id } value={gestor.id}>
                          {gestor.user}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.gestor && (
                      <FormHelperText>{errors.gestor.message}</FormHelperText>
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
