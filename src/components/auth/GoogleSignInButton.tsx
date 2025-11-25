'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '@/contexts/AuthContext';

interface GoogleSignInButtonProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export default function GoogleSignInButton({
    onSuccess,
    onError
}: GoogleSignInButtonProps) {
    const { signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async () => {
        try {
            setLoading(true);
            setError(null);
            await signInWithGoogle();
            if (onSuccess) onSuccess();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
            setError(errorMessage);
            if (onError && err instanceof Error) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSignIn}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
                sx={{
                    backgroundColor: '#fff',
                    color: '#757575',
                    border: '1px solid #dadce0',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 24px',
                    '&:hover': {
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    },
                    '&:disabled': {
                        backgroundColor: '#f1f3f4',
                        color: '#9aa0a6',
                    },
                }}
            >
                {loading ? 'Iniciando sesión...' : 'Continuar con Google'}
            </Button>

            {error && (
                <Typography
                    color="error"
                    variant="caption"
                    sx={{ mt: 1, display: 'block', textAlign: 'center' }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
}
