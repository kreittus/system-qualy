'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  SpaceDashboardOutlined,
} from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import TaskIcon from '@mui/icons-material/Task';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useRouter } from 'next/navigation';
import { Page } from '@/types/pages';
import { useAuth } from '@/context/AuthContext';
// import CookieConsent from '@/_components/CookieConsent';

// Interface para descrever as propriedades do layout
interface LayoutProps {
  children: React.ReactNode;
}

// Largura fixa do drawer
const drawerWidth = 240;

const SistemaLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { userSession, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [openSubMenu2, setOpenSubMenu2] = useState<number | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuToggle = (id: number) => { 
    
    setOpenSubMenu((prevOpen) =>  (prevOpen === id ? null : id )) ;
  };
  const handleSubMenuToggle2 = (id: number) => { 
   
    setOpenSubMenu2((prevOpen) =>  (prevOpen === id ? null : id )) ;
  };

  const pages: Page[] = [
    {
      id: 1,
      title: 'Notificações',
      icon: <CircleNotificationsIcon />,
      subPages: [
        { id: 11, title: 'Registrar' },
        { id: 12, title: 'Notificações' },
        { id: 13, title: 'Plano de Ação' },
      ],
    },
    {
      id: 2,
      title: 'Tarefas',
      icon: <TaskIcon />,
      subPages: [
        { id: 21, title: 'Controle de Atividades' },
        { id: 22, title: 'Prazos' },
      ],
    },
    {
      id: 3,
      title: 'Documentos',
      icon: <FolderIcon />,
      subPages: [
        { id: 31, title: 'Upload' },
        { id: 32, title: 'Consultar' },
        { id: 33, title: 'Relatórios' },
      ],
    },
    {
      id: 4,
      title: 'Indicadores',
      icon: <SpaceDashboardOutlined />,
      subPages: [
        { id: 41, title: 'Gráficos' },
        { id: 42, title: 'Relatórios' },
      ],
    },
    {
      id: 5,
      title: 'Cadastros',
      icon: <AppRegistrationIcon />,
      subPages: [
        { id: 51, title: 'Diretorias' },
        { id: 52, title: 'Setores'},
        { id: 53, title: 'Tipos de Eventos',
          subPages:[
              {id:54, title:'Registrar'},
              {id:55, title:'Listagem'},
          ]  
        },
      ]
    },
  ];  

const drawer = (
  <div>
    <Toolbar />
    <List>
      {pages.map((page) => (
        <div key={page.id}>
          {/* Nível 1 */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSubMenuToggle(page.id)}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
              {page.subPages ? (
                openSubMenu === page.id ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )
              ) : null}
            </ListItemButton>
          </ListItem>
          {page.subPages && (
            <Collapse in={openSubMenu === page.id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {page.subPages.map((subPage) => (
                  <div key={subPage.id}>
                    {/* Nível 2 */}
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                          if(subPage.id === 11){ //Notificações - Registrar
                            router.push('/system/notify/notifyreg');
                          }
                          if(subPage.id === 12){ //Notificações - Minhas notificações
                            router.push('/system/notify/mynotifications');
                          }
                          if(subPage.id === 51){ //Cadastros - Diretorias
                            router.push('/system/registers/directors');
                          }  
                          if(subPage.id === 53){ //Cadastros - tpEventos
                             handleSubMenuToggle2(subPage.id)
                          } 
                        }}
                      >
                        <ListItemIcon>{subPage.icon}</ListItemIcon>
                        <ListItemText primary={subPage.title}   />
                        {subPage.subPages ? (
                          openSubMenu2 === subPage.id ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )
                        ) : null}
                      </ListItemButton>
                    </ListItem>
                    {subPage.subPages &&  (   
                      <Collapse in={openSubMenu2 === subPage.id} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {subPage.subPages.map((thirdLevelPage) => (
                            <ListItem key={thirdLevelPage.id} disablePadding>
                              {/* Nível 3 */} 
                              <ListItemButton
                                sx={{ pl: 13 }}
                                onClick={() => {
                                  //router.push(`/path/to/${thirdLevelPage.id}`);
                                }}
                              >
                                <ListItemText primary={thirdLevelPage.title} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </div>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  </div>
);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: '100%' },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={() => router.push('/system')} sx={{ cursor: 'pointer' }} variant="h5" noWrap component="div">
            Sistema de Qualidade
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon fontSize='large' />
          </IconButton>

          {/* Menu ao clicar no ícone do usuário */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <div className='flex p-2 items-center justify-center'>
              <span>{userSession?.username}</span>
            </div>
            <Divider variant="fullWidth" color='blue' />
            <MenuItem onClick={() => router.push('/system/config')}>
              <SettingsIcon sx={{ mr: 1 }} />
              Configurações
            </MenuItem>
            <MenuItem>
              <AccountCircleIcon sx={{ mr: 1 }} />
              Perfil
            </MenuItem>
            <MenuItem onClick={ () => logout()}>
              <LogoutIcon sx={{ mr: 1 }}/> 
                Sair do sistema
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer} 
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
      {/* <CookieConsent /> */}
    </Box>
  );
};

export default SistemaLayout;
