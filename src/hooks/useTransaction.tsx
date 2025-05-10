'use client';
import { errorAtom } from '@/stores';
import { transactionAtom } from '@/stores/transaction';
import { ApiSuccessResponse } from '@/types';
import { ITransactionRequest } from '@/types/transaction';
import { api } from '@/utils/api';
import { fetchError } from '@/utils/fetchError';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

export function useTransaction(scheduleId: string) {
    const [transaction, setTransaction] = useAtom(transactionAtom);
    const setError = useSetAtom(errorAtom);
    const [txLoading, setTxLoading] = useState<boolean>(true);

    const fetchTx = useCallback(async () => {
        setTxLoading(true);
        try {
            const { data } = await api.get<ApiSuccessResponse<ITransactionRequest & { ttl: number }>>(`${process.env.NEXT_PUBLIC_API}/cart/${scheduleId}`);
            setTransaction(data.data);
        } catch (error) {
            fetchError(error, setError);
        } finally {
            setTxLoading(false);
        }
    }, [scheduleId, setError, setTransaction]);

    useEffect(() => {
        // tunggu sampai scheduleId ada/is valid
        if (!scheduleId) return;

        // atur delay 2 detik (2000ms)
        const timeoutId = setTimeout(() => {
            fetchTx();
        }, 2000);

        // bersihkan timeout kalau component unmount atau scheduleId berubah
        return () => clearTimeout(timeoutId);
    }, [scheduleId, fetchTx]);

    return { fetchTx, transaction, txLoading, setTransaction };
}
