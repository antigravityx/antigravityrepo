'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';
import { isProfileCompleteSync } from '@/lib/firestore/users';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // User is not authenticated, redirect to login
                // But if we are on register page, allow it (for fusion flow)
                if (pathname !== '/auth/register' && pathname !== '/auth/login') {
                    router.push('/auth/register');
                }
            } else {
                // User is authenticated, check if profile is complete
                const isComplete = isProfileCompleteSync(user);
                if (!isComplete && pathname !== '/auth/register') {
                    router.push('/auth/register');
                }
            }
        }
    }, [user, loading, router, pathname]);

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

    // If not authenticated and not on public pages, don't render children
    // But since we redirect, returning null is fine.
    // However, for the register page, we WANT to render children even if not authenticated (or partially authenticated)
    if (!user && pathname !== '/auth/register' && pathname !== '/auth/login') {
        return null;
    }

    return <>{children}</>;
}
