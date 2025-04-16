// src/stores/auth.store.ts
import { Account } from '@/types/auth';
import { atom } from 'jotai';

export const accountAtom = atom<Account>({
    email: '',
    user: {
        firstName: '',
        lastName: '',
    },
    role: {
        name: 'member',
    },
});
export const isLoadingAtom = atom<boolean>(true);
