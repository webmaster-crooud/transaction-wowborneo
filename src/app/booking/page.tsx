'use client';
import { AddonBooking } from '@/components/Booking/addon.booking';
import { MainBooking } from '@/components/Booking/main.booking';
import { ServiceBooking } from '@/components/Booking/service.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { useTransaction } from '@/hooks/useTransaction';
import { errorAtom } from '@/stores';
import { scheduleIdAtom } from '@/stores/transaction';
import { ApiSuccessResponse } from '@/types';
import { IBookingItineraryResponse } from '@/types/transaction';
import { api } from '@/utils/api';
import { fetchError } from '@/utils/fetchError';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function BookingIteneraryPage() {
    const [scheduleId] = useAtom(scheduleIdAtom);
    const router = useRouter();

    const { transaction, txLoading } = useTransaction(scheduleId);

    const setError = useSetAtom(errorAtom);
    const fetchBooking = useCallback(async (cabin: string, schedule: string) => {
        const { data } = await api.get<ApiSuccessResponse<IBookingItineraryResponse>>(`${process.env.NEXT_PUBLIC_API}/transaction/booking/${cabin}/${schedule}`);

        return data.data;
    }, []);

    const {
        data: service,
        // isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['bookingItenerary', transaction.cabinId, scheduleId],
        queryFn: () => fetchBooking(transaction.cabinId, scheduleId),
        enabled: Boolean(transaction.cabinId),
    });

    useEffect(() => {
        if (!txLoading && !transaction.cabinId) {
            router.push('/');
        }
    }, [txLoading, transaction.cabinId, router]);
    useEffect(() => {
        if (isError) fetchError((error as Error).message, setError);
    }, [isError, error, setError, router]);
    console.log(txLoading);

    if (txLoading) {
        return <CurtainTransition />;
    }
    return (
        <>
            <MainBooking>
                <>
                    <div>
                        <p className="font-bold text-2xl mb-3">1. Booking Itinerary</p>
                        {service && transaction && <ServiceBooking transaction={transaction} service={service} />}
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-2xl">2. Adds on</p>
                            <small className="text-gray-400">Complete your journey with our adds on package</small>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <AddonBooking addons={service?.addons || []} scheduleId={scheduleId.toString()} />
                        </div>
                    </div>
                </>
            </MainBooking>
        </>
    );
}
