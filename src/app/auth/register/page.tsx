'use client';

// VerixRichon Registration Page
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
    Alert,
    Divider,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { IconUserPlus, IconLogin } from '@tabler/icons-react';

export default function RegisterPage() {
    const { user, loading, signUp } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        email: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.username.trim()) {
            setError('Por favor ingresa un nombre de usuario');
            return;
        }
        if (!formData.displayName.trim()) {
            setError('Por favor ingresa tu nombre o alias');
            return;
        }
        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setSubmitting(true);

        try {
            await signUp!(
                formData.username,
                formData.password,
                formData.displayName,
                formData.email || undefined
            );
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Error al registrarse');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return null;
    }

    if (user) {
        return null;
    }

    return (
        <PageContainer title="Registro" description="Crea tu cuenta VerixRichon">
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
                                        sx={{ color: '#fff', mb: 1 }}
                                    >
                                        Crear Cuenta
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                    >
                                        Únete a VerixRichon
                                    </Typography>
                                </Box>

                                {error && (
                                    <Alert severity="error" onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}

                                {/* Registration Form */}
                                <form onSubmit={handleRegister}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="Usuario"
                                            value={formData.username}
                                            onChange={(e) =>
                                                setFormData({ ...formData, username: e.target.value })
                                            }
                                            required
                                            placeholder="usuario123"
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
                                            label="Nombre o Alias"
                                            value={formData.displayName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, displayName: e.target.value })
                                            }
                                            required
                                            placeholder="Tu Nombre"
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
                                            type="email"
                                            label="Email (Opcional)"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            placeholder="tu@email.com"
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
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({ ...formData, password: e.target.value })
                                            }
                                            required
                                            helperText="Mínimo 6 caracteres"
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
                                                '& .MuiFormHelperText-root': {
                                                    color: 'rgba(255, 255, 255, 0.5)',
                                                },
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            type="password"
                                            label="Confirmar Contraseña"
                                            value={formData.confirmPassword}
                                            onChange={(e) =>
                                                setFormData({ ...formData, confirmPassword: e.target.value })
                                            }
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

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            disabled={submitting}
                                            startIcon={<IconUserPlus />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                fontWeight: 600,
                                                py: 1.5,
                                                mt: 2,
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                                },
                                            }}
                                        >
                                            {submitting ? 'Registrando...' : 'Crear Cuenta'}
                                        </Button>
                                    </Stack>
                                </form>

                                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                        o
                                    </Typography>
                                </Divider>

                                {/* Login Link */}
                                <Box textAlign="center">
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        ¿Ya tienes cuenta?{' '}
                                        <Button
                                            variant="text"
                                            onClick={() => router.push('/auth/login')}
                                            startIcon={<IconLogin size={18} />}
                                            sx={{
                                                color: '#00d4ff',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    background: 'rgba(0, 212, 255, 0.1)',
                                                },
                                            }}
                                        >
                                            Inicia Sesión
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
    Registration Page - No Firebase Required
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
