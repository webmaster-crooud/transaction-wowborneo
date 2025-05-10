'use client';
import { Loader } from '@/components/Loader';
import { ActionButton } from '@/components/ui/Button/Action.button';
import { FilterForm } from '@/components/ui/Form/Filter.form';
import { TableService } from '@/components/ui/Services/Table.service';
import { errorAtom } from '@/stores';
import { ApiSuccessResponse, IScheduleResponse } from '@/types';
import { api } from '@/utils/api';
import { fetchError } from '@/utils/fetchError';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

export interface ITransactionParams {
    cruiseId?: string;
    month?: string | Date;
    pax?: number;
}
export default function MainPage() {
    const setError = useSetAtom(errorAtom);
    const [fill, setFill] = useState<ITransactionParams>({
        cruiseId: '',
        month: '',
        pax: 1,
    });
    // 2. Buat helper untuk membangun URL
    function buildTransactionUrl(baseUrl: string, params: ITransactionParams): string {
        const searchParams = new URLSearchParams();

        if (params.cruiseId) {
            searchParams.append('cruiseId', params.cruiseId);
        }
        if (params.month) {
            searchParams.append('month', params.month.toString());
        }
        if (params.pax !== undefined) {
            searchParams.append('pax', params.pax.toString());
        }

        const queryString = searchParams.toString();
        return queryString ? `${baseUrl}/transaction?${queryString}` : `${baseUrl}/transaction`;
    }

    const fetchSchedule = async (cruiseId: string, month: string | Date, pax: number) => {
        const params: ITransactionParams = { cruiseId, month, pax };
        const url = buildTransactionUrl(process.env.NEXT_PUBLIC_API!, params);

        const { data } = await api.get<ApiSuccessResponse<IScheduleResponse[]>>(url);
        return data.data;
    };

    const {
        data: schedule,
        isLoading,
        isError,
        error,
        // isFetching,
        // status,
    } = useQuery({
        queryKey: ['schedule', fill.cruiseId, fill.month, fill.pax],
        queryFn: () => fetchSchedule(fill.cruiseId || '', fill.month || '', fill.pax || 1),
        staleTime: 5 * 60 * 1000, // 5 menit
        gcTime: 15 * 60 * 1000, // Ganti cacheTime menjadi gcTime
    });

    if (isLoading) return <Loader />;
    if (isError) {
        fetchError(error.message, setError);
    }
    return (
        <>
            <motion.article initial={{ height: '0px' }} animate={{ height: '100%' }} transition={{ duration: 0.5 }} className="relative overflow-hidden" exit={{ x: '-100rem', opacity: '0' }}>
                <FilterForm fetchSchedule={() => fetchSchedule(fill.cruiseId || '', fill.month || '', fill.pax || 1)} fill={fill} setFill={setFill} schedule={schedule || []} />

                <TableService guest={fill.pax || 1} services={schedule || []} />
                <div className="flex items-center justify-between gap-5 mt-5 mb-20">
                    <p>
                        Can&apos;t find the date you&apos;re looking for? Request a <span className="uppercase font-bold italic">private booking</span> to secure your preferred schedulle.
                    </p>

                    <ActionButton title="Request a Quote" />
                </div>
            </motion.article>
        </>
    );
}
