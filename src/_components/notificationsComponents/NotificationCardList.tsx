'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NotificationTypes_APIResponse } from '@/types/notifications';
import { formatDateToBrazilian, getSectorName, getStatusName } from '@/utils/constants';

export const responsiveStylesButton = {
  button: {
    fontSize: {
      xs: '0.3rem', // Font size para telas extra pequenas
      sm: '0.475rem', // Font size para telas pequenas e médias
      md: '0.8rem', // Font size para telas médias e grandes
    },
    padding: {
      xs: '2px 4px', // Padding para telas extra pequenas
      sm: '3px 6px', // Padding para telas pequenas e médias
      md: '4px 8px', // Padding para telas médias e grandes
    },
  },
};

interface NotificationsCardListProps {
  notifications: NotificationTypes_APIResponse[];
  statusColor: (status: number) => 'success' | 'info' | 'warning' | 'primary' | 'default' | 'error';
  onViewDetails: (notification: NotificationTypes_APIResponse) => void;
  onEdit?: (notification: NotificationTypes_APIResponse) => void;
  onDelete?: (notification: NotificationTypes_APIResponse) => void;
}

const NotificationsCardList: React.FC<NotificationsCardListProps> = ({
  notifications,
  statusColor,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {notifications.map((notification) => (
        <Card key={notification.id} variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {notification.titulo}
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
            <Typography variant="body2" color="textSecondary">
              <strong>Usuário responsável:</strong> 
            </Typography>
            <Chip
              label={getStatusName(notification.status)}
              color={statusColor(notification.status)}
              size="small"
              sx={{ mt: 2 }}
            />
          </CardContent>
          <CardActions>
            <Stack direction="row" spacing={1} marginLeft="auto" marginRight={1} marginBottom={1}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={() => onViewDetails(notification)}
                sx={{
                  fontSize: responsiveStylesButton.button.fontSize,
                  padding: responsiveStylesButton.button.padding,
                }}
              >
                Ver detalhes
              </Button>
              {onEdit && (
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(notification)}
                  sx={{
                    fontSize: responsiveStylesButton.button.fontSize,
                    padding: responsiveStylesButton.button.padding,
                  }}
                >
                  Editar
                </Button>
              )}
              {onDelete && (
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(notification)}
                  sx={{
                    fontSize: responsiveStylesButton.button.fontSize,
                    padding: responsiveStylesButton.button.padding,
                  }}
                >
                  Excluir
                </Button>
              )}
            </Stack>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default NotificationsCardList;
