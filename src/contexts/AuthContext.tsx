'use client';

// VerixRichon Auth Context (Replaces Firebase Auth)
// Firmado por: VerixRichon Software Factory
// "Build what we need, own what we build"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { verixAuth, VerixUser } from '@/lib/verixrichon-auth';

// Types for backward compatibility
export interface UserProfile extends VerixUser {
    uid: string; // Alias for id - Mandatory
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    createdAt: any;
    updatedAt: any;
}

export interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signInWithGoogle?: () => Promise<void>; // Deprecated, kept for compatibility
    signInAnonymously?: () => Promise<void>; // Deprecated, kept for compatibility
    signOut: () => Promise<void>;
    refreshUserProfile?: () => Promise<void>;
    // New VerixRichon methods
    signIn?: (username: string, password: string) => Promise<void>;
    signUp?: (username: string, password: string, displayName: string, email?: string) => Promise<void>;
    signInAsGuest?: () => Promise<void>;
    updateUserProfile?: (updates: Partial<VerixUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const currentUser = verixAuth.getCurrentUser();
        if (currentUser) {
            setUser({ ...currentUser, uid: currentUser.id, createdAt: currentUser.createdAt, updatedAt: currentUser.lastLogin }); // Add uid alias
            console.log('[VerixRichon] Session restored:', currentUser.displayName);
        }
        setLoading(false);
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const loggedInUser = await verixAuth.login(username, password);
            setUser({ ...loggedInUser, uid: loggedInUser.id, createdAt: loggedInUser.createdAt, updatedAt: loggedInUser.lastLogin });
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
            setUser({ ...newUser, uid: newUser.id, createdAt: newUser.createdAt, updatedAt: newUser.lastLogin });
        } catch (error) {
            console.error('[VerixRichon] Registration error:', error);
            throw error;
        }
    };

    const signInAsGuest = async () => {
        try {
            const guestUser = await verixAuth.loginAsGuest();
            setUser({ ...guestUser, uid: guestUser.id, createdAt: guestUser.createdAt, updatedAt: guestUser.lastLogin });
        } catch (error) {
            console.error('[VerixRichon] Guest login error:', error);
            throw error;
        }
    };

    // Deprecated: For backward compatibility with Firebase
    const signInAnonymously = async () => {
        console.warn('[VerixRichon] signInAnonymously is deprecated, using signInAsGuest instead');
        await signInAsGuest();
    };

    const signOut = async () => {
        verixAuth.logout();
        setUser(null);
    };

    const updateUserProfile = async (updates: Partial<VerixUser>) => {
        try {
            const updatedUser = await verixAuth.updateProfile(updates);
            setUser({ ...updatedUser, uid: updatedUser.id, createdAt: updatedUser.createdAt, updatedAt: updatedUser.lastLogin });
        } catch (error) {
            console.error('[VerixRichon] Profile update error:', error);
            throw error;
        }
    };

    const refreshUserProfile = async () => {
        const currentUser = verixAuth.getCurrentUser();
        if (currentUser) {
            setUser({ ...currentUser, uid: currentUser.id, createdAt: currentUser.createdAt, updatedAt: currentUser.lastLogin });
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        signIn,
        signUp,
        signInAsGuest,
        signInAnonymously, // Deprecated, redirects to signInAsGuest
        signOut,
        updateUserProfile,
        refreshUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Auth Context - No Firebase Required
    Free, Secure, Self-Hosted
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
