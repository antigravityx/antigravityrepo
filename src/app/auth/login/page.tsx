'use client';

// VerixRichon Login Page
// Firmado por: VerixRichon Software Factory

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Stack,
    TextField,
    Button,
    Divider,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';

export default function LoginPage() {
    const { user, loading, signIn, signInAsGuest } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signIn!(username, password);
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setError('');
        setIsLoading(true);

        try {
            await signInAsGuest!();
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Error al iniciar como invitado');
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return null;
    }

    if (user) {
        return null;
    }

    return (
        <PageContainer title="Iniciar Sesión" description="Inicia sesión con VerixRichon Auth">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    py: 4,
                }}
            >
                <Container maxWidth="sm">
                    <Card
                        elevation={10}
                        sx={{
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Stack spacing={3}>
                                {/* Header */}
                                <Box textAlign="center">
                                    <Typography
                                        variant="h3"
                                        fontWeight="700"
                                        sx={{
                                            color: '#fff',
                                            mb: 1,
                                        }}
                                    >
                                        Bienvenido
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                    >
                                        Sistema de autenticación VerixRichon
                                    </Typography>
                                </Box>

                                {/* Login Form */}
                                <form onSubmit={handleLogin}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="Usuario"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#fff',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                },
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            type="password"
                                            label="Contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: '#fff',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                },
                                            }}
                                        />

                                        {error && (
                                            <Typography color="error" variant="body2">
                                                {error}
                                            </Typography>
                                        )}

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            disabled={isLoading}
                                            startIcon={<IconLogin />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                fontWeight: 600,
                                                py: 1.5,
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                                },
                                            }}
                                        >
                                            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                                        </Button>
                                    </Stack>
                                </form>

                                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                        o
                                    </Typography>
                                </Divider>

                                {/* Guest Login */}
                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    onClick={handleGuestLogin}
                                    disabled={isLoading}
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        color: '#fff',
                                        fontWeight: 600,
                                        '&:hover': {
                                            borderColor: 'rgba(255, 255, 255, 0.4)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                        },
                                    }}
                                >
                                    Continuar como Invitado
                                </Button>

                                {/* Register Link */}
                                <Box textAlign="center">
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        ¿No tienes cuenta?{' '}
                                        <Button
                                            variant="text"
                                            onClick={() => router.push('/auth/register')}
                                            startIcon={<IconUserPlus size={18} />}
                                            sx={{
                                                color: '#00d4ff',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    background: 'rgba(0, 212, 255, 0.1)',
                                                },
                                            }}
                                        >
                                            Regístrate
                                        </Button>
                                    </Typography>
                                </Box>

                                {/* Footer */}
                                <Typography
                                    variant="caption"
                                    textAlign="center"
                                    sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.5)' }}
                                >
                                    🌀 VerixRichon Software Factory
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </PageContainer>
    );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Login Page - No Firebase Required
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
