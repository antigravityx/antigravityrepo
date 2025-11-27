// VerixRichon Authentication System
// Firmado por: VerixRichon Software Factory
// Fecha: 25 de Noviembre 2025
// "Build what we need, own what we build"

import { v4 as uuidv4 } from 'uuid';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface VerixUser {
    id: string;
    username: string;
    displayName: string;
    email?: string;
    photoURL?: string;
    address?: string;
    location?: {
        lat: number;
        lng: number;
    };
    createdAt: string;
    lastLogin: string;
    signature: 'VerixRichon';
}

export interface VerixSession {
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
}

// ============================================
// CRYPTO UTILITIES
// ============================================

class VerixCrypto {
    // Simple hash function (for demo - in production use bcrypt or similar)
    static async hashPassword(password: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + 'VERIXRICHON_SALT');
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        const passwordHash = await this.hashPassword(password);
        return passwordHash === hash;
    }

    static generateToken(): string {
        return uuidv4() + '-VRX-' + Date.now();
    }
}

// ============================================
// LOCAL STORAGE MANAGER
// ============================================

class VerixStorage {
    private static USERS_KEY = 'verixrichon_users';
    private static SESSION_KEY = 'verixrichon_session';
    private static CURRENT_USER_KEY = 'verixrichon_current_user';

    static getUsers(): Record<string, any> {
        if (typeof window === 'undefined') return {};
        const data = localStorage.getItem(this.USERS_KEY);
        return data ? JSON.parse(data) : {};
    }

    static saveUser(user: VerixUser, passwordHash: string) {
        const users = this.getUsers();
        users[user.username] = {
            ...user,
            passwordHash,
        };
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    static getUser(username: string): any {
        const users = this.getUsers();
        return users[username];
    }

    static saveSession(session: VerixSession) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }

    static getSession(): VerixSession | null {
        const data = localStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    }

    static clearSession() {
        localStorage.removeItem(this.SESSION_KEY);
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }

    static saveCurrentUser(user: VerixUser) {
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    }

    static getCurrentUser(): VerixUser | null {
        const data = localStorage.getItem(this.CURRENT_USER_KEY);
        return data ? JSON.parse(data) : null;
    }
}

// ============================================
// VERIXRICHON AUTH SERVICE
// ============================================

export class VerixAuthService {
    private static instance: VerixAuthService;

    private constructor() { }

    static getInstance(): VerixAuthService {
        if (!this.instance) {
            this.instance = new VerixAuthService();
        }
        return this.instance;
    }

    // Register new user
    async register(
        username: string,
        password: string,
        displayName: string,
        email?: string
    ): Promise<VerixUser> {
        // Check if user exists
        const existingUser = VerixStorage.getUser(username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        // Hash password
        const passwordHash = await VerixCrypto.hashPassword(password);

        // Create user
        const user: VerixUser = {
            id: uuidv4(),
            username,
            displayName,
            email,
            photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=667eea&color=fff`,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            signature: 'VerixRichon',
        };

        // Save user
        VerixStorage.saveUser(user, passwordHash);

        console.log('[VerixRichon Auth] User registered:', username);
        return user;
    }

    // Login user
    async login(username: string, password: string): Promise<VerixUser> {
        const userData = VerixStorage.getUser(username);

        if (!userData) {
            throw new Error('User not found');
        }

        // Verify password
        const isValid = await VerixCrypto.verifyPassword(password, userData.passwordHash);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        // Update last login
        const user: VerixUser = {
            ...userData,
            lastLogin: new Date().toISOString(),
        };
        VerixStorage.saveUser(user, userData.passwordHash);

        // Create session
        const session: VerixSession = {
            userId: user.id,
            token: VerixCrypto.generateToken(),
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        };
        VerixStorage.saveSession(session);
        VerixStorage.saveCurrentUser(user);

        console.log('[VerixRichon Auth] User logged in:', username);
        return user;
    }

    // Login as guest
    async loginAsGuest(): Promise<VerixUser> {
        const guestId = uuidv4();
        const user: VerixUser = {
            id: guestId,
            username: `guest_${guestId.slice(0, 8)}`,
            displayName: 'Guest User',
            photoURL: 'https://ui-avatars.com/api/?name=Guest&background=764ba2&color=fff',
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            signature: 'VerixRichon',
        };

        // Create session
        const session: VerixSession = {
            userId: user.id,
            token: VerixCrypto.generateToken(),
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        };
        VerixStorage.saveSession(session);
        VerixStorage.saveCurrentUser(user);

        console.log('[VerixRichon Auth] Guest logged in');
        return user;
    }

    // Get current user
    getCurrentUser(): VerixUser | null {
        const session = VerixStorage.getSession();
        if (!session) return null;

        // Check if session expired
        if (new Date(session.expiresAt) < new Date()) {
            this.logout();
            return null;
        }

        return VerixStorage.getCurrentUser();
    }

    // Logout
    logout() {
        VerixStorage.clearSession();
        console.log('[VerixRichon Auth] User logged out');
    }

    // Update user profile
    async updateProfile(updates: Partial<VerixUser>): Promise<VerixUser> {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            throw new Error('No user logged in');
        }

        const userData = VerixStorage.getUser(currentUser.username);
        if (!userData) {
            throw new Error('User data not found');
        }

        const updatedUser: VerixUser = {
            ...currentUser,
            ...updates,
            id: currentUser.id, // Don't allow ID change
            username: currentUser.username, // Don't allow username change
            signature: 'VerixRichon', // Always VerixRichon
        };

        VerixStorage.saveUser(updatedUser, userData.passwordHash);
        VerixStorage.saveCurrentUser(updatedUser);

        console.log('[VerixRichon Auth] Profile updated');
        return updatedUser;
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return this.getCurrentUser() !== null;
    }
}

// Export singleton instance
export const verixAuth = VerixAuthService.getInstance();

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Authentication System
    Free, Secure, Self-Hosted
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
