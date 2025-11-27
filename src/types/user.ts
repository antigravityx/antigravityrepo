import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
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
    signInWithGoogle: () => Promise<void>;
    signInAnonymously: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshUserProfile: () => Promise<void>;
}
