'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile, createUserProfile } from '@/lib/firestore/users';
import { UserProfile, AuthContextType } from '@/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUserProfile = async (firebaseUser: FirebaseUser) => {
        try {
            let profile = await getUserProfile(firebaseUser.uid);

            // If profile doesn't exist, create a basic one
            if (!profile) {
                await createUserProfile(firebaseUser.uid, {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || '',
                    photoURL: firebaseUser.photoURL || undefined,
                });
                profile = await getUserProfile(firebaseUser.uid);
            }

            setUser(profile);
        } catch (error: any) {
            console.error('Error fetching user profile:', error);

            // If Firestore is blocked or offline, create a temporary user profile from Firebase Auth
            if (error?.code === 'unavailable' || error?.message?.includes('offline') || error?.message?.includes('blocked')) {
                console.warn('Firestore unavailable, using Firebase Auth data');
                const tempProfile: any = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || '',
                    photoURL: firebaseUser.photoURL || undefined,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                setUser(tempProfile);
            } else {
                setUser(null);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                await refreshUserProfile(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await refreshUserProfile(result.user);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        signInWithGoogle,
        signInAnonymously: async () => {
            try {
                const { signInAnonymously: firebaseSignInAnonymously } = await import('firebase/auth');
                const result = await firebaseSignInAnonymously(auth);
                await refreshUserProfile(result.user);
            } catch (error) {
                console.error('Error signing in anonymously:', error);
                throw error;
            }
        },
        signOut,
        refreshUserProfile: async () => {
            if (auth.currentUser) {
                await refreshUserProfile(auth.currentUser);
            }
        },
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
