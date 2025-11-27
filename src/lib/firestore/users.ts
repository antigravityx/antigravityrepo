import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '@/types/user';

const USERS_COLLECTION = 'users';
const TIMEOUT_MS = 10000; // 10 seconds timeout

// Helper to wrap promises with timeout
const withTimeout = <T>(promise: Promise<T>, errorMessage: string): Promise<T> => {
    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(errorMessage));
        }, TIMEOUT_MS);
    });

    return Promise.race([
        promise.then((res) => {
            clearTimeout(timeoutId);
            return res;
        }),
        timeoutPromise
    ]);
};

/**
 * Create a new user profile in Firestore
 */
export async function createUserProfile(
    uid: string,
    data: Partial<UserProfile>
): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, uid);

    await withTimeout(
        setDoc(userRef, {
            ...data,
            uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }),
        'Timeout creating user profile. Check your connection.'
    );
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, USERS_COLLECTION, uid);

    try {
        const userSnap = await withTimeout(
            getDoc(userRef),
            'Timeout fetching user profile. If you are using an Ad Blocker, please disable it for this site.'
        );

        if (userSnap.exists()) {
            return userSnap.data() as UserProfile;
        }
    } catch (error) {
        console.warn('Error getting user profile:', error);
        return null;
    }

    return null;
}

/**
 * Update user profile in Firestore
 */
export async function updateUserProfile(
    uid: string,
    data: Partial<UserProfile>
): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, uid);

    await withTimeout(
        setDoc(userRef, {
            ...data,
            updatedAt: serverTimestamp(),
        }, { merge: true }),
        'Timeout updating user profile. Check your connection.'
    );
}

/**
 * Check if user profile is complete
 */
export async function isProfileComplete(uid: string): Promise<boolean> {
    const profile = await getUserProfile(uid);

    if (!profile) return false;

    return !!(
        profile.displayName &&
        profile.shippingAddress?.street &&
        profile.shippingAddress?.city &&
        profile.shippingAddress?.state &&
        profile.shippingAddress?.country &&
        profile.shippingAddress?.coordinates
    );
}

/**
 * Check if user profile is complete (Synchronous)
 */
export function isProfileCompleteSync(profile: any): boolean {
    if (!profile) return false;

    return !!(
        profile.displayName &&
        profile.shippingAddress?.street &&
        profile.shippingAddress?.city &&
        profile.shippingAddress?.state &&
        profile.shippingAddress?.country &&
        profile.shippingAddress?.coordinates
    );
}
