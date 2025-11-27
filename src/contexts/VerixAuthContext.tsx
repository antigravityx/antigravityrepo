'use client';

// VerixRichon Auth Context
// Firmado por: VerixRichon Software Factory

import React, { createContext, useContext, useState, useEffect } from 'react';
import { verixAuth, VerixUser } from '@/lib/verixrichon-auth';

interface VerixAuthContextType {
    user: VerixUser | null;
    loading: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signUp: (username: string, password: string, displayName: string, email?: string) => Promise<void>;
    signInAsGuest: () => Promise<void>;
    signOut: () => void;
    updateUserProfile: (updates: Partial<VerixUser>) => Promise<void>;
    isAuthenticated: boolean;
}

const VerixAuthContext = createContext<VerixAuthContextType | undefined>(undefined);

export function VerixAuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<VerixUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const currentUser = verixAuth.getCurrentUser();
        setUser(currentUser);
        setLoading(false);

        if (currentUser) {
            console.log('[VerixRichon] Session restored:', currentUser.displayName);
        }
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const loggedInUser = await verixAuth.login(username, password);
            setUser(loggedInUser);
        } catch (error) {
            console.error('[VerixRichon] Login error:', error);
            throw error;
        }
    };

    const signUp = async (
        username: string,
        password: string,
        displayName: string,
        email?: string
    ) => {
        try {
            const newUser = await verixAuth.register(username, password, displayName, email);
            setUser(newUser);
        } catch (error) {
            console.error('[VerixRichon] Registration error:', error);
            throw error;
        }
    };

    const signInAsGuest = async () => {
        try {
            const guestUser = await verixAuth.loginAsGuest();
            setUser(guestUser);
        } catch (error) {
            console.error('[VerixRichon] Guest login error:', error);
            throw error;
        }
    };

    const signOut = () => {
        verixAuth.logout();
        setUser(null);
    };

    const updateUserProfile = async (updates: Partial<VerixUser>) => {
        try {
            const updatedUser = await verixAuth.updateProfile(updates);
            setUser(updatedUser);
        } catch (error) {
            console.error('[VerixRichon] Profile update error:', error);
            throw error;
        }
    };

    const value: VerixAuthContextType = {
        user,
        loading,
        signIn,
        signUp,
        signInAsGuest,
        signOut,
        updateUserProfile,
        isAuthenticated: user !== null,
    };

    return (
        <VerixAuthContext.Provider value={value}>
            {children}
        </VerixAuthContext.Provider>
    );
}

export function useVerixAuth() {
    const context = useContext(VerixAuthContext);
    if (context === undefined) {
        throw new Error('useVerixAuth must be used within a VerixAuthProvider');
    }
    return context;
}

// Backward compatibility with Firebase AuthContext
export { useVerixAuth as useAuth };

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Auth Context - React Integration
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
