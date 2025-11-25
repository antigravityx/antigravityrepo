'use client';

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      handleClose2();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const theme = useTheme();

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={user?.photoURL || "/images/users/user2.jpg"}
          alt={user?.displayName || "User"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      {/* ------------------------------------------- */}
      {/* Profile Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt: 0
          },
        }}
      >
        <Box pt={2}>
          <Typography variant="h6" fontWeight={600}>
            {user?.displayName || 'Usuario'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {user?.email || ''}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box pt={0}>
          <List>
            <ListItemButton component={Link} href="/auth/register">
              <ListItemText primary="Mi Perfil" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Mi Cuenta" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Cambiar Contraseña" />
            </ListItemButton>
          </List>
        </Box>

        <Divider />

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
