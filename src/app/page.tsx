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

export default function MainPage() {
    const setError = useSetAtom(errorAtom);
    const fetchSchedule = async () => {
        const { data } = await api.get<ApiSuccessResponse<IScheduleResponse[]>>(`${process.env.NEXT_PUBLIC_API}/transaction`);
        return data.data;
    };

    const {
        data: schedule,
        isLoading,
        isError,
        error,
        // isFetching,
        // status,
        // refetch,
    } = useQuery({
        queryKey: ['schedule'],
        queryFn: fetchSchedule,
        staleTime: 5 * 60 * 1000, // 5 menit
        gcTime: 15 * 60 * 1000, // Ganti cacheTime menjadi gcTime
    });

    const [guest, setGuest] = useState<number>(1);

    if (isLoading) return <Loader />;
    if (isError) {
        fetchError(error.message, setError);
    }
    return (
        <>
            <motion.article initial={{ height: '0px' }} animate={{ height: '100%' }} transition={{ duration: 0.5 }} className="relative overflow-hidden" exit={{ x: '-100rem', opacity: '0' }}>
                <FilterForm guest={guest} setGuest={setGuest} />
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center justify-start gap-3">
                        <p>You have selected an item within the following criteria:</p>
                        <p className="flex items-center justify-start gap-1">
                            <b>Cruise:</b>
                            <span>All Cruise</span>
                        </p>
                        <p className="flex items-center justify-start gap-1">
                            <b>Month/Years:</b>
                            <span>March 2025</span>
                        </p>
                        <p className="flex items-center justify-start gap-1">
                            <b>Guest:</b>
                            <span>{guest}</span>
                        </p>
                    </div>
                    <p>We found {schedule?.length} itineraries available for You</p>
                </div>

                <TableService guest={guest} services={schedule || []} />
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
