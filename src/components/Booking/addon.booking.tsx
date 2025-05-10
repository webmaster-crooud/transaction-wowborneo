'use client';
import { IconCircleMinus, IconCirclePlus, IconInfoCircle, IconLoader3 } from '@tabler/icons-react';
import Image from 'next/image';
import { BookingCard } from '../ui/Card/Booking.card';
import { IBookingItineraryResponse, ITransactionRequest } from '@/types/transaction';
import { formatCurrency } from '@/utils/main';

import React, { useCallback, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/utils/api';
import { useTransaction } from '@/hooks/useTransaction';
import { useSetAtom } from 'jotai';
import { errorAtom } from '@/stores';
import { ApiSuccessResponse } from '@/types';
import { fetchError } from '@/utils/fetchError';

type propsAddonBooking = {
    addons: IBookingItineraryResponse['addons'];
    scheduleId: string;
};

export function AddonBooking({ addons, scheduleId }: propsAddonBooking) {
    const { transaction, setTransaction } = useTransaction(scheduleId);
    const { account } = useAuth();
    const setError = useSetAtom(errorAtom);
    const [loading, setLoading] = useState<number | null>(null);

    const handleSetAddon = useCallback(
        async (newAddonsBody: { id: number; qty: number }[], idx: number) => {
            setLoading(idx);
            try {
                if (!account.email) {
                    setError({ message: 'You must login first!' });
                    return;
                }
                const { data } = await api.patch<ApiSuccessResponse<ITransactionRequest>>(`${process.env.NEXT_PUBLIC_API}/cart/addons/${scheduleId}`, newAddonsBody, { withCredentials: true });
                setTransaction(data.data);
            } catch (error) {
                fetchError(error, setError);
            } finally {
                setLoading(null);
            }
        },
        [account.email, scheduleId, setError, setTransaction],
    );
    const updateAddonQty = useCallback(
        async (addonId: number, type: 'plus' | 'min') => {
            setTransaction(prev => {
                let newBody: { id: number; qty: number }[];

                if (type === 'plus') {
                    const exists = prev.addons.find(a => a.id === addonId);
                    newBody = exists ? prev.addons.map(a => (a.id === addonId ? { ...a, qty: a.qty + 1 } : a)) : [...prev.addons, { id: addonId, qty: 1 }];
                } else {
                    newBody = prev.addons.map(a => (a.id === addonId ? { ...a, qty: Math.max(a.qty - 1, 0) } : a)).filter(a => a.qty > 0);
                }

                // langsung kirim newBody yang sudah ter-update
                handleSetAddon(newBody, addonId);

                return { ...transaction, newBody };
            });
        },
        [handleSetAddon, setTransaction, transaction],
    );

    return addons.map(addon => {
        const selectedAddon = transaction?.addons.find(txAddon => txAddon.id === addon.id);
        const currentQty = selectedAddon?.qty || 0;
        return (
            <BookingCard className="flex flex-col gap-y-3" key={addon.id}>
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-start justify-start gap-3">
                        <div className="w-4/12 object-cover object-center rounded-xl max-h-16 overflow-hidden">
                            <Image src={addon.cover || '/boats-1.jpeg'} alt={'addson'} width={200} height={200} style={{ width: '100%', height: 'auto' }} priority />
                        </div>
                        <h1 className="font-bold w-full">{addon.title}</h1>
                    </div>
                    <button>
                        <IconInfoCircle size={20} stroke={2} className="text-brown" />
                    </button>
                </div>

                <p className="text-xs" dangerouslySetInnerHTML={{ __html: addon.description || '' }} />

                {/* Footer */}
                <div className="flex items-center justify-start gap-x-6">
                    <h6 className="font-bold text-[20px]">{formatCurrency(addon.price.toString())}/pax</h6>

                    <div className="flex items-center justify-center p-3 border border-brown rounded-xl gap-3">
                        <button onClick={() => updateAddonQty(addon.id, 'min')} disabled={currentQty === 0}>
                            <IconCircleMinus size={18} className={`text-brown ${currentQty === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                        </button>
                        <span className="text-sm text-brown min-w-[20px] text-center">{loading === addon.id ? <IconLoader3 size={20} stroke={2} className="animate-spin" /> : currentQty}</span>
                        <button onClick={() => updateAddonQty(addon.id, 'plus')}>
                            <IconCirclePlus size={18} className="text-brown" />
                        </button>
                    </div>
                </div>
            </BookingCard>
        );
    });
}
