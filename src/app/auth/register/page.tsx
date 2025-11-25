'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Container, Stack, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/lib/firestore/users';
import AddressInput from '@/components/maps/AddressInput';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function RegisterPage() {
    const { user, loading, refreshUserProfile } = useAuth();
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

    useEffect(() => {
        // Optionally redirect if not logged in
        if (!loading && !user) {
            // router.replace('/auth/login');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

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
            setError('Por favor usa el botón GPS para obtener tu ubicación');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);
            await updateUserProfile(user.uid, {
                displayName: formData.displayName,
                shippingAddress: formData.shippingAddress,
            });
            await refreshUserProfile();
            router.push('/auth/confirm');
        } catch (err) {
            setError('Error al guardar el perfil. Por favor intenta nuevamente.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !user) {
        return null;
    }

    return (
        <PageContainer title="Completar Registro" description="Completa tu perfil para continuar">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#111',
                    py: 4,
                }}
            >
                <Container maxWidth="md">
                    <Card elevation={10} sx={{ borderRadius: 4, bgcolor: '#222', color: '#fff' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Stack spacing={3}>
                                <Typography variant="h4" fontWeight="700" textAlign="center" gutterBottom>
                                    Completa tu Perfil
                                </Typography>
                                <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
                                    Necesitamos algunos datos para procesar tus pedidos
                                </Typography>
                                {error && (
                                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField
                                            label="Nombre o Alias"
                                            value={formData.displayName}
                                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                            required
                                            fullWidth
                                            helperText="¿Cómo quieres que te llamemos?"
                                        />
                                        <Box>
                                            <Typography variant="h6" gutterBottom>Dirección de Envío</Typography>
                                            <AddressInput
                                                value={formData.shippingAddress}
                                                onChange={(address) => setFormData({ ...formData, shippingAddress: address })}
                                            />
                                        </Box>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            disabled={submitting}
                                            sx={{
                                                mt: 2,
                                                bgcolor: '#000',
                                                color: '#fff',
                                                '&:hover': { bgcolor: '#222' },
                                            }}
                                        >
                                            {submitting ? 'Guardando...' : 'Guardar y Continuar'}
                                        </Button>
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
