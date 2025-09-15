import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const drawerWidth = 240;

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Sidebar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

// Dummy Toolbar to create space below the TopBar
const Toolbar = () => <div style={{ minHeight: 64 }} />;
