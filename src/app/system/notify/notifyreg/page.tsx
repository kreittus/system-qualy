'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { DAMAGE_DEGREE, PATIENT_RACE, SECTORS, STATUS_NOTIFICATION, TYPE_NOTIFICATION } from "@/utils/constants";
import { defaultValuesNotifySchema, NotifySchema, notifySchema } from "@/utils/validations/notifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { api } from "@/utils/api";
import AlertModal from "@/_components/AlertModal";
import { useState } from "react";
import { AlertModalProps } from "@/types/modals/AlertModalProps";
import LoadingPage from "@/_components/errors/LoadingPage";
import { useAuth } from "@/context/AuthContext";

export default function NotifyReg() {
  const [loading, setLoading] = useState(false);
  const { userSession } = useAuth();
  const [modalState, setModalState] = useState<AlertModalProps>({ 
    open: false, 
    success: false,
    message: "", 
    redirectPath: "", 
    onClose: () => setModalState((prev) => ({ ...prev, open: false })),
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue, reset} = useForm<NotifySchema>({
    resolver: zodResolver(notifySchema),
    defaultValues: defaultValuesNotifySchema,
  });

  const typeNotify = watch("typeNotify");
  const isNotifyNC: boolean = typeNotify === 2; //Não conformidade

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (submitData: any) => {
    setLoading(true);
    const mappedData = {
      usuario_responsavel: userSession?.userId, 
      dt_ocorrencia: submitData.dateOccurrence,
      hr_ocorrencia: submitData.timeOccurrence,
      nomePaciente: submitData.patientName,
      id_evento: submitData.eventType,
      sexo: submitData.patientSex,
      raca_cor: submitData.patientRace || null,
      idade: parseInt(submitData.patientAge) || null,
      dt_internacao: submitData.admissionDate || null,
      status: submitData.status,
      id_tarefa: submitData.id_task || null,
      id_setor_notificante: submitData.sectorNotify,
      id_setor_notificado: submitData.sectorNotified,
      diagnostico: submitData.diagnostic,
      registro: parseInt(submitData.registerPatient),
      grau_dano: submitData.damageDegree || null,
      titulo: submitData.title,
      descricao: submitData.description,
      envolvimento: submitData.involved, 
      anonimato: submitData.anonymous, 
    };
    
    //Sent data to API using the mapped data
    try{
      const response = await api.post("createNotificacao/", mappedData);
      const { status, data: message } = response; 

      if(status === 200){
        setModalState({
          open: true,
          success: true, //change animation for sucess or error
          message: `${message}`,
          redirectPath: "",
          onClose: () => setModalState((prev) => ({ ...prev, open: false })),
        });

        //Clean the fields of the form later sent data
        reset(defaultValuesNotifySchema);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any  
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

  if(loading){
    return (
      <LoadingPage message="Enviando dados..." />
    );
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
        <Typography variant="h5" fontWeight="bold" gutterBottom marginBottom={4}>
          Registrar Notificação
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Date and Time of Occurrence */}
            <Grid item xs={6} sm={3}>
              <Controller
                name="dateOccurrence"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Data da Ocorrência"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOccurrence}
                    helperText={errors.dateOccurrence?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Controller
                name="timeOccurrence"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Hora da Ocorrência"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.timeOccurrence}
                    helperText={errors.timeOccurrence?.message}
                  />
                )}
              />
            </Grid>

            {/* Type of Notification */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="typeNotify"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="typeNotifyLabel">Tipo de Notificação</InputLabel>
                    <Select
                      {...field}
                      labelId="typeNotifyLabel"
                      label="Tipo de Notificação"
                      error={!!errors.typeNotify}
                    >
                      {TYPE_NOTIFICATION.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.typeNotify && <FormHelperText>{errors.typeNotify.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Patient Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="patientName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome do Paciente"
                    variant="outlined"
                    placeholder="Nome do paciente completo"
                    error={!!errors.patientName}
                    helperText={errors.patientName?.message}
                  />
                )}
              />
            </Grid>

            {/* Sex and Race Patient */}
            <Grid item xs={6} sm={3}>
              <Controller
                name="patientSex"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="patientSexLabel">Sexo</InputLabel>
                    <Select
                      {...field}
                      labelId="patientSexLabel"
                      label="Sexo"
                      error={!!errors.patientSex}
                    >
                      <MenuItem value="M">Masculino</MenuItem>
                      <MenuItem value="F">Feminino</MenuItem>
                    </Select>
                    {errors.patientSex && <FormHelperText>{errors.patientSex.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            {!isNotifyNC && (
              <Grid item xs={6} sm={3}>
                <Controller
                  name="patientRace"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="patientRaceLabel">Raça/Cor</InputLabel>
                      <Select
                        {...field}
                        labelId="patientRaceLabel"
                        label="Raça/Cor"
                        error={!!errors.patientRace}
                      >
                        {PATIENT_RACE.map((race) => (
                          <MenuItem key={race.id} value={race.name}>
                            {race.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.patientRace && <FormHelperText>{errors.patientRace.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
            )}

            {/* Age and Admission Date */}
            {!isNotifyNC && (
              <>
                {/* Patient Age */}
                <Grid item xs={6} sm={3}>
                  <Controller
                    name="patientAge"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Idade do Paciente"
                        type="string"
                        variant="outlined"
                        placeholder="Idade do paciente"
                        error={!!errors.patientAge}
                        helperText={errors.patientAge?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Controller
                    name="admissionDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Data de Internação"
                        type="date"
                        placeholder="DD/MM/AAAA"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.admissionDate}
                        helperText={errors.admissionDate?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            {/* Diagnostic */}
            <Grid item xs={6}>
              <Controller
                name="diagnostic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Diagnóstico"
                    variant="outlined"
                    placeholder="Diagnóstico do paciente"
                    error={!!errors.diagnostic}
                    helperText={errors.diagnostic?.message}
                  />
                )}
              />
            </Grid>

            {/* Patient Register */}
            <Grid item xs={6}>
              <Controller
                name="registerPatient"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Registro do Paciente"
                    type="string"
                    variant="outlined"
                    placeholder="Digite apenas números do registro do paciente"
                    error={!!errors.registerPatient}
                    helperText={errors.registerPatient?.message}
                  />
                )}
              />
            </Grid>

            {/* Type of Event */}
            <Grid item xs={6} sm={3}>
              <Controller
                name="eventType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="eventTypeLabel">Tipo de Evento</InputLabel>
                    <Select
                      {...field}
                      labelId="eventTypeLabel"
                      label="Tipo de Evento"
                      error={!!errors.eventType}
                    >
                      <MenuItem value={1}>Evento 1</MenuItem>
                      <MenuItem value={2}>Evento 2</MenuItem>
                    </Select>
                    {errors.eventType && <FormHelperText>{errors.eventType.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Damage Degree */}
            {!isNotifyNC && (
              <Grid item xs={6} sm={3}>
                <Controller
                  name="damageDegree"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="damageDegreeLabel">Grau do Dano</InputLabel>
                      <Select
                        {...field}
                        labelId="damageDegreeLabel"
                        label="Grau do Dano"
                        error={!!errors.damageDegree}
                      >
                        {DAMAGE_DEGREE.map((degree) => (
                          <MenuItem key={degree.id} value={degree.name}>
                            {degree.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.damageDegree && <FormHelperText>{errors.damageDegree.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
            )}
            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Título"
                    variant="outlined"
                    placeholder="Título da notificação"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Descrição"
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Descreva o incidente com detalhes"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Sectors Notify and Notified */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="sectorNotify"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="sectorNotifyLabel">Setor notificante</InputLabel>
                    <Select
                      {...field}
                      labelId="sectorNotifyLabel"
                      label="Setor notificante"
                      error={!!errors.sectorNotify}
                    >
                      {SECTORS.map((sector) => (
                        <MenuItem key={sector.numbercdc} value={sector.numbercdc}>
                          {sector.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sectorNotify && <FormHelperText>{errors.sectorNotify.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="sectorNotified"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="sectorNotifiedLabel">Setor notificado</InputLabel>
                    <Select
                      {...field}
                      labelId="sectorNotifiedLabel"
                      label="Setor notificado"
                      error={!!errors.sectorNotified}
                    >
                      {SECTORS.map((sector) => (
                        <MenuItem key={sector.numbercdc} value={sector.numbercdc}>
                          {sector.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sectorNotified && <FormHelperText>{errors.sectorNotified.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Involved */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="involved"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Estou envolvido no incidente?</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                      <FormControlLabel value="no" control={<Radio />} label="Não" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Anonymous */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="anonymous"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Desejo manter anonimato?</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                      <FormControlLabel value="no" control={<Radio />} label="Não" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>


            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                onClick={() => setValue("status", STATUS_NOTIFICATION[0].id)}
              >
              {loading ? 'Enviando...' : 'Enviar à Qualidade'}
              </Button>
            </Grid>
          </Grid>
        </form>
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
  );
}
