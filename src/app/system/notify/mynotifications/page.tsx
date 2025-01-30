'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Pagination,
  Modal,
} from '@mui/material';
import { api } from '@/utils/api';
import { NotificationTypes_APIResponse } from '@/types/notifications';
import LoadingPage from '@/_components/errors/LoadingPage';
import { AlertModalProps } from '@/types/modals/AlertModalProps';
import AlertModal from '@/_components/AlertModal';
import NotificationDetails from '@/_components/notificationsComponents/NotificationDetails';
import NotificationsCardList from '@/_components/notificationsComponents/NotificationCardList';

export default function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  const [selectedNotification, setSelectedNotification] = useState<NotificationTypes_APIResponse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<AlertModalProps>({
    open: false,
    success: false,
    message: "",
    redirectPath: "",
    onClose: () => setModalState((prev) => ({ ...prev, open: false })), //Set the open state to false to close the modal
  });

  //useEffect para buscar as notificações assim que o componente for montado
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await api.get('buscaNotificacoes');
        const { status, data } = response;

        if(status === 200) {
          setNotifications(data);
        }
        
        if(status === 401) {
          setModalState({
            open: true,
            success: false, //change animation for sucess or error
            message: `${data?.message}`,
            redirectPath: "/auth/login",
            onClose: () => setModalState((prev) => ({ ...prev, open: false })),
          });
        }
      } catch (error) {
        setModalState({
          open: true,
          success: false,
          message: `${error}`,
          redirectPath: "/auth/login",
          onClose: () => setModalState((prev) => ({ ...prev, open: false })),
        });
      } finally { 
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  // Calcula o número total de páginas baseado na quantidade de notificações
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  // Função para mudar a página atual na paginação
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtra as notificações com base no termo de pesquisa
  const filteredNotifications = notifications.filter((notification: NotificationTypes_APIResponse) =>
    notification.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Divide as notificações filtradas para exibir apenas as da página atual
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Define a cor do Chip com base no status da notificação
  const statusColor = (status: number) => {
    switch (status) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'primary';
      case 5: return 'default';
      case 6: return 'error';
      default: return 'default';
    }
  };

  // Função para abrir o Modal com os detalhes da notificação
  const handleViewDetails = (notification: NotificationTypes_APIResponse) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  if (loading) {
    return <LoadingPage message="Carregando notificações..." />;
  }

  return (
    <Container maxWidth="xl">
      {/* Header com o título e o campo de pesquisa */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Notificações</Typography>
        <TextField
          sx={{
            maxWidth: '50%',
          }}
          size="small"
          placeholder="Pesquisar"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Exibição das notificações em formato de Cards */}
      <NotificationsCardList
          notifications={paginatedNotifications}
          statusColor={statusColor}
          onViewDetails={handleViewDetails}
          onEdit={(notification) => console.log('Editar:', notification)}
          onDelete={(notification) => console.log('Excluir:', notification)}
        />

      {/* Paginação */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>

      {/* Modal para exibir os detalhes da notificação */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedNotification && (
            <NotificationDetails 
              notification={selectedNotification}
              statusColor={statusColor}
            />
          )}
        </Box>
      </Modal>

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
