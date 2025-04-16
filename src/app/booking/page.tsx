'use client';
import { AddonBooking } from '@/components/Booking/addon.booking';
import { MainBooking } from '@/components/Booking/main.booking';
import { ServiceBooking } from '@/components/Booking/service.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { Loader } from '@/components/Loader';
import { errorAtom } from '@/stores';
import { transactionAtom } from '@/stores/transaction';
import { ApiSuccessResponse } from '@/types';
import { IBookingItineraryResponse, ITransactionRequest } from '@/types/transaction';
import { api } from '@/utils/api';
import { fetchError } from '@/utils/fetchError';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BookingIteneraryPage() {
    const [transaction, setTransaction] = useAtom(transactionAtom);
    const [service, setService] = useState<IBookingItineraryResponse | null>(null);
    const setError = useSetAtom(errorAtom);
    const router = useRouter();
    const [loading, setLoading] = useState<{ stack: string; field?: string }>({ stack: '', field: '' });

    const fetchBooking = async (cabinId: string, scheduleId: string) => {
        setLoading({ stack: 'fetch', field: 'Fetching Booking Cruise' });
        try {
            const { data } = await api.get<ApiSuccessResponse<IBookingItineraryResponse>>(`${process.env.NEXT_PUBLIC_API}/transaction/booking/${cabinId}/${scheduleId}`);
            setService(data.data);
        } catch (error) {
            fetchError(error, setError);
        } finally {
            setLoading({ stack: '', field: '' });
        }
    };

    useEffect(() => {
        const transactionBody: ITransactionRequest | null = localStorage.getItem('transactionBody') ? JSON.parse(localStorage.getItem('transactionBody') as string) : null;

        if (!transactionBody) {
            router.push('/');
            setError({ message: 'Your transaction is not completed! Please make sure your transaction' });
            return;
        }

        // Sync dengan atom Jotai
        setTransaction(transactionBody);
        fetchBooking(transactionBody.cabinId, transactionBody.scheduleId);
    }, []);

    if (loading.stack === 'fetch' && loading.field) {
        return <Loader />;
    }

    return (
        <>
            <CurtainTransition />
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
                            <AddonBooking addons={service?.addons || []} />
                        </div>
                    </div>
                </>
            </MainBooking>
        </>
    );
}
