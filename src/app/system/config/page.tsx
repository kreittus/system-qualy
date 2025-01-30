import {
    Container,
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
  } from "@mui/material";
  import React from "react";
  import SettingsIcon from "@mui/icons-material/Settings";
  import SecurityIcon from "@mui/icons-material/Security";
  import NotificationsIcon from "@mui/icons-material/Notifications";
  
  export default function Config() {
    // Array de itens do menu lateral
    const menuItems = [
      {
        id: 1,
        title: "Configurações Gerais",
        icon: <SettingsIcon color="primary" />,
        selected: true, // Indica que o item está selecionado
      },
      {
        id: 2,
        title: "Segurança",
        icon: <SecurityIcon />,
        selected: false,
      },
      {
        id: 3,
        title: "Notificações",
        icon: <NotificationsIcon />,
        selected: false,
      },
    ];
  
    return (
      <Container maxWidth="xl" className="mt-8">
        <Grid container spacing={4}>
          {/* Menu Lateral */}
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Configurações do Sistema
              </Typography>
              <Divider sx={{ mb: 2 }} />
  
              {/* Renderizando itens dinamicamente */}
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton selected={item.selected}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
  
          {/* Formulário */}
          <Grid item xs={12} sm={9}>
            <Box
              sx={{
                bgcolor: "white",
                p: 3,
                borderRadius: 1,
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Meus dados
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    placeholder="Nome"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sobrenome"
                    variant="outlined"
                    placeholder="Sobrenome"
                  />
                </Grid>
              </Grid>
  
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Meus dados de contato
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    placeholder="email@dominio.com.br"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Número Celular"
                    variant="outlined"
                    placeholder="(XX) X XXXX-XXXX"
                  />
                </Grid>
              </Grid>
  
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
  