'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Container, Stack, TextField, Button, Alert, Divider } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile, isProfileCompleteSync } from '@/lib/firestore/users';
import AddressInput from '@/components/maps/AddressInput';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { IconUser } from '@tabler/icons-react';

export default function RegisterPage() {
    const { user, loading, signInAnonymously, refreshUserProfile } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        displayName: '',
        shippingAddress: {
            street: '',
            city: '',
            state: '',
            country: 'Argentina',
            postalCode: '',
            coordinates: undefined as { lat: number; lng: number } | undefined,
        },
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Pre-fill form if user is already logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                displayName: user.displayName || prev.displayName,
                shippingAddress: user.shippingAddress ? { ...prev.shippingAddress, ...user.shippingAddress } : prev.shippingAddress,
            }));

            // If profile is already complete, redirect to dashboard
            if (isProfileCompleteSync(user)) {
                router.push('/');
            }
        }
    }, [user, router]);

    const onRegisterClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.displayName.trim()) {
            setError('Por favor ingresa tu nombre o alias');
            return;
        }
        if (!formData.shippingAddress.street.trim() ||
            !formData.shippingAddress.city.trim() ||
            !formData.shippingAddress.state.trim() ||
            !formData.shippingAddress.country.trim()) {
            setError('Por favor completa todos los campos de dirección');
            return;
        }
        if (!formData.shippingAddress.coordinates) {
            setError('Por favor usa el botón GPS para obtener tu ubicación exacta');
            return;
        }

        setSubmitting(true);

        try {
            // 1. Auth (if not logged in)
            let currentUser = user;
            if (!currentUser) {
                await signInAnonymously();
                // Note: signInAnonymously in context calls refreshUserProfile, so user state should update eventually.
                // But we need to wait for the context to update or just proceed if we trust the flow.
                // Ideally we would wait for 'user' to change in a useEffect, but for simplicity in this "Fusion" flow:
                // We will rely on the fact that if signInAnonymously succeeds, we are logged in.
                // However, we need the UID to save data.
                // Let's use a flag to trigger saving data after user update.
                setIsReadyToSave(true);
            } else {
                setIsReadyToSave(true);
            }
        } catch (err: any) {
            console.error(err);
            setError('No se pudo iniciar sesión como invitado.');
            setSubmitting(false);
        }
    };

    // Logic to handle saving data after auth
    const [isReadyToSave, setIsReadyToSave] = useState(false);

    useEffect(() => {
        const saveData = async () => {
            if (isReadyToSave && user) {
                try {
                    await updateUserProfile(user.uid, {
                        displayName: formData.displayName,
                        shippingAddress: formData.shippingAddress,
                    });
                    await refreshUserProfile(); // Refresh to ensure strict gating lets us through
                    router.push('/');
                } catch (err) {
                    console.error(err);
                    setError('Error al guardar los datos. Intenta nuevamente.');
                    setSubmitting(false);
                    setIsReadyToSave(false);
                }
            }
        };
        saveData();
    }, [user, isReadyToSave, formData, refreshUserProfile, router]);

    if (loading) return null;

    return (
        <PageContainer title="Registro" description="Registro de usuario">
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111', py: 4 }}>
                <Container maxWidth="md">
                    <Card elevation={10} sx={{ borderRadius: 4, bgcolor: '#222', color: '#fff' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Stack spacing={3}>
                                <Typography variant="h4" fontWeight="700" textAlign="center" gutterBottom>
                                    {user ? 'Completa tus Datos' : 'Únete a la Revolución'}
                                </Typography>
                                <Typography variant="body1" textAlign="center" sx={{ mb: 2, color: 'text.secondary' }}>
                                    {user
                                        ? 'Necesitamos tu dirección para enviarte los productos.'
                                        : 'Completa el formulario y entra como invitado en un solo paso.'}
                                </Typography>

                                {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}

                                <form onSubmit={onRegisterClick}>
                                    <Stack spacing={3}>
                                        <TextField
                                            label="Nombre o Alias"
                                            value={formData.displayName}
                                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                            required
                                            fullWidth
                                            placeholder="Ej: CyberPunk2077"
                                        />

                                        <Box sx={{ border: '1px solid #333', borderRadius: 2, p: 2 }}>
                                            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                                                📍 Dirección de Envío (Obligatorio)
                                            </Typography>
                                            <AddressInput
                                                value={formData.shippingAddress}
                                                onChange={(address) => setFormData({ ...formData, shippingAddress: address })}
                                            />
                                        </Box>

                                        <Divider sx={{ my: 2, borderColor: '#333' }} />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            disabled={submitting}
                                            startIcon={!user ? <IconUser /> : null}
                                            sx={{
                                                py: 2,
                                                fontSize: '1.1rem',
                                                bgcolor: user ? 'primary.main' : '#000', // Black for Guest
                                                color: '#fff',
                                                '&:hover': {
                                                    bgcolor: user ? 'primary.dark' : '#333'
                                                },
                                            }}
                                        >
                                            {submitting
                                                ? 'Procesando...'
                                                : user
                                                    ? 'GUARDAR DATOS Y CONTINUAR'
                                                    : 'GUARDAR Y ENTRAR'}
                                        </Button>

                                        {!user && (
                                            <Typography variant="caption" textAlign="center" color="text.secondary">
                                                Entrarás como invitado. Tus datos se guardarán en este dispositivo.
                                            </Typography>
                                        )}
                                    </Stack>
                                </form>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </PageContainer>
    );
}
