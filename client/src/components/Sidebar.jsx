import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PedidosIcon from '@mui/icons-material/ShoppingCart';  
import ProductosIcon from '@mui/icons-material/Store'; 
import YourImage from '../logo2.png'; 
import { useNavigate, useLocation } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Tooltip } from '@mui/material';

const drawerWidth = 240;
const navbarHeight = 64;

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#73816E', // Changed to the original sidebar background color
  borderBottom: '1px solid rgba(255,255,255,0.1)', // Subtle border
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  marginBottom: theme.spacing(1),
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items with icons and routes
  const menuItems = [
    { 
      text: "Dashboard", 
      icon: <DashboardIcon />, 
      route: "/Dashboard" 
    },
    { 
      text: "Productos", 
      icon: <ProductosIcon />, 
      route: "/Products" 
    },
    { 
      text: "Proveedores", 
      icon: <PedidosIcon />, 
      route: "/Providers" 
    },
    { 
      text: "Proyectos", 
      icon: <GroupIcon />, 
      route: "/tasks" 
    },
    { 
      text: "Clientes", 
      icon: <AssignmentIndIcon />, 
      route: "/Clients" 
    },
    { 
      text: "Pedidos", 
      icon: <PedidosIcon />, 
      route: "/orders" 
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#73816E', // Original sidebar background color
            color: 'white', // White text color
            top: `${navbarHeight}px`, 
            height: `calc(100% - ${navbarHeight}px)`, 
            borderRight: '1px solid rgba(255,255,255,0.1)', // Subtle border
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Subtle shadow
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <LogoContainer>
          <LogoImage src={YourImage} alt="Logo" />
        </LogoContainer>

        <List>
          {menuItems.map((item) => (
            <Tooltip key={item.text} title={item.text} placement="right">
              <ListItem 
                disablePadding 
                sx={{ 
                  display: 'block',
                  backgroundColor: location.pathname === item.route 
                    ? 'rgba(255,255,255,0.1)' // Highlight active route
                    : 'transparent' 
                }}
                onClick={() => navigate(item.route)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.05)', // Subtle hover effect
                    }
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 0, 
                      mr: 3, 
                      justifyContent: "center",
                      color: location.pathname === item.route 
                        ? 'white' // White for active route
                        : 'rgba(255,255,255,0.7)' // Slightly transparent white for inactive
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: 1, 
                      color: location.pathname === item.route 
                        ? 'white' 
                        : 'rgba(255,255,255,0.7)' 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}