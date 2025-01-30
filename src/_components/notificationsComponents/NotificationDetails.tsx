import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { formatDateToBrazilian, getSectorName, getStatusName } from '@/utils/constants';
import { NotificationTypes_APIResponse } from '@/types/notifications';

// Interface para as propriedades do componente
interface NotificationDetailsProps {
  notification: NotificationTypes_APIResponse;
  statusColor: (status: number) => 'success' | 'info' | 'warning' | 'primary' | 'default' | 'error';
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({ notification, statusColor }) => {
  return (
    <>
      <Typography
        sx={{ textAlign: 'center' }}
        id="modal-title"
        variant="h5"
        component="h2"
        gutterBottom
        marginBottom={4}
      >
        Detalhes da Notificação
      </Typography>
      <Typography id="modal-description" variant="body2" color="textSecondary">
        <strong>Título:</strong> {notification.titulo}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Data de Ocorrência:</strong> {formatDateToBrazilian(notification.dt_ocorrencia)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Setor Notificante:</strong> {getSectorName(notification.id_setor_notificante)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Setor Notificado:</strong> {getSectorName(notification.id_setor_notificado)}
      </Typography>
      <Chip
        sx={{ mt: 1 }}
        label={getStatusName(notification.status)}
        color={statusColor(notification.status)}
        size="small"
      />
      <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="textSecondary">
          <strong>Descrição da Notificação</strong>
        </Typography>
        <Typography
          sx={{
            mt: 2,
            textAlign: 'justify',
            backgroundColor: '#f1f1f0',
            padding: 2,
            borderRadius: 2,
            wordWrap: 'break-word', // Quebra palavras longas
            overflowWrap: 'break-word', // Compatibilidade adicional para quebra
            maxHeight: '40vh', // Altura máxima do conteúdo
            overflowY: 'auto', // Adiciona scroll se o conteúdo for maior que o permitido
          }}
          variant="body2"
        >
          {notification.descricao}
        </Typography>
      </Box>
    </>
  );
};

export default NotificationDetails;
