import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Logo from "../shared/logo/Logo";
// components
import Profile from './Profile';
import { IconMenu2, IconShoppingCart } from '@tabler/icons-react';
import { useCart } from '@/contexts/CartContext';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const { totalItems, totalPrice, toggleCart } = useCart();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    justifyContent: "center",
    backdropFilter: "blur(10px)",
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '64px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    padding: '0 24px',
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Logo */}
        <Box sx={{ width: '256px' }}>
          <Logo />
        </Box>

        {/* Mobile Menu Toggle */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            color: '#fff',
            display: { lg: "none", xs: "flex" },
          }}
        >
          <IconMenu2 width="22" height="22" />
        </IconButton>

        <Box flexGrow={1} />

        {/* Minimalist: Only 3 buttons - Menu, Cart, Profile */}
        <Stack spacing={2} direction="row" alignItems="center">
          <Button
            color="inherit"
            startIcon={<Badge badgeContent={totalItems} color="error"><IconShoppingCart /></Badge>}
            sx={{
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
            onClick={toggleCart}
          >
            ${totalPrice.toFixed(2)}
          </Button>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Minimalist Header - 3 Buttons Only
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
