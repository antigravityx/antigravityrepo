'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Stack,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { isProfileComplete } from '@/lib/firestore/users';

export default function LoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkUserAndRedirect = async () => {
            if (!loading && user) {
                try {
                    // User is authenticated, check if profile is complete
                    const profileComplete = await isProfileComplete(user.uid);

                    if (profileComplete) {
                        router.push('/');
                    } else {
                        router.push('/auth/register');
                    }
                } catch (error) {
                    console.error('Error checking profile:', error);
                    // If there's an error, redirect to register to be safe
                    router.push('/auth/register');
                }
            }
        };

        checkUserAndRedirect();
    }, [user, loading, router]);

    if (loading) {
        return null; // Show nothing while checking auth
    }

    if (user) {
        return null; // Will redirect via useEffect
    }

    return (
        <PageContainer title="Iniciar Sesión" description="Inicia sesión con tu cuenta de Google">
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
                <Container maxWidth="sm">
                    <Card
                        elevation={10}
                        sx={{
                            borderRadius: 4,
                            bgcolor: '#222',
                            color: '#fff',
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Stack spacing={3} alignItems="center">
                                {/* Logo or Title */}
                                <Typography
                                    variant="h3"
                                    fontWeight="700"
                                    textAlign="center"
                                    sx={{
                                        color: '#fff',
                                    }}
                                >
                                    Bienvenido
                                </Typography>

                                <Typography
                                    variant="body1"
                                    textAlign="center"
                                    sx={{ color: '#ccc' }}
                                >
                                    Inicia sesión para acceder a tu cuenta y comenzar a comprar
                                </Typography>

                                {/* Google Sign In Button */}
                                <Box sx={{ width: '100%', mt: 2 }}>
                                    <GoogleSignInButton />
                                </Box>

                                <Typography
                                    variant="caption"
                                    textAlign="center"
                                    sx={{ mt: 2, color: '#888' }}
                                >
                                    Al continuar, aceptas nuestros términos de servicio y política de privacidad
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </PageContainer>
    );
}
