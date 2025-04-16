// src/hooks/useAuth.ts

import { accountAtom, isLoadingAtom } from '@/stores/auth.store';
import { useAtom } from 'jotai';

export const useAuth = () => {
    const [account] = useAtom(accountAtom);
    const [isLoading] = useAtom(isLoadingAtom);
    return {
        account,
        isLoading,
    };
};
