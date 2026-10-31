import { create } from 'zustand';
import type { User } from '../types';

interface SessionState {
    accessToken: string | null;
    user: User | null;
    setSession: (
        accessToken: string,
        user: User,
    ) => void;
    clearSession: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
    accessToken: null,
    user: null,
    setSession: (
        accessToken: string,
        user: User,
    ) => set({ accessToken, user }),
    clearSession: () => set({ accessToken: null, user: null }),
}));
