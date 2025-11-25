'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Container, Button, Alert } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function ConfirmPage() {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        // If somehow accessed without user, redirect to login
        router.replace('/auth/login');
        return null;
    }

    const { displayName, shippingAddress } = user;

    return (
        <PageContainer title="Confirmación" description="Revisa tus datos antes de continuar">
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
                            <Typography variant="h4" fontWeight="700" textAlign="center" gutterBottom>
                                ¡Todo listo!
                            </Typography>
                            <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
                                Revisa la información que ingresaste:
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                                    <strong>Nombre:</strong> {displayName}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                                    <strong>Dirección:</strong> {shippingAddress?.street}, {shippingAddress?.city}, {shippingAddress?.state}, {shippingAddress?.country}
                                </Typography>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: '#000',
                                    color: '#fff',
                                    '&:hover': { bgcolor: '#222' },
                                }}
                                onClick={() => router.push('/')}
                            >
                                Continuar al Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </PageContainer>
    );
}
