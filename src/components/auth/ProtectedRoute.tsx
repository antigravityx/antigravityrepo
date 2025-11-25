'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { isProfileComplete } from '@/lib/firestore/users';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireCompleteProfile?: boolean;
}

export default function ProtectedRoute({
    children,
    requireCompleteProfile = true
}: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if (loading) return;

            // Not authenticated - redirect to login
            if (!user) {
                router.push('/auth/login');
                return;
            }

            // Check if profile is complete
            if (requireCompleteProfile) {
                const profileComplete = await isProfileComplete(user.uid);
                if (!profileComplete) {
                    router.push('/auth/register');
                }
            }
        };

        checkAuth();
    }, [user, loading, router, requireCompleteProfile]);

    // Show loading while checking auth
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // Don't render children until auth is verified
    if (!user) {
        return null;
    }

    return <>{children}</>;
}
