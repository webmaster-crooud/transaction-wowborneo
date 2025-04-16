'use client';

import { CanvasImage } from '@/components/CanvasImage';
import { RichTextPreview } from '@/components/ui/RichTextPreview';
import { IconUserScan, IconBedFilled, IconTextCaption, IconLoader3 } from '@tabler/icons-react';
import { IDetailScheduleResponse } from '@/types';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSetAtom } from 'jotai';
import { errorAtom } from '@/stores';
import { fetchError } from '@/utils/fetchError';
import { transactionAtom } from '@/stores/transaction';
import { useRouter } from 'next/navigation';

interface CabinListProps {
    schedule: IDetailScheduleResponse;
    guestCount: string;
}

interface CabinCardProps {
    cabin: IDetailScheduleResponse['boat']['cabins'][0];
    duration: number;
    scheduleId: string;
    guestCount: string;
    cruiseTitle: string;
}

export const CabinList = ({ schedule, guestCount }: CabinListProps) => {
    if (!schedule.boat.cabins.length) {
        return <div className="p-5 text-center text-gray-500">No cabins available for this schedule</div>;
    }

    return (
        <article id="cabin" className="mt-8">
            <div className="pb-5">
                <h3 className="font-semibold text-xl text-gray-600 tracking-wide">{schedule.boat.name}&apos;s Cabin</h3>
                <div className="bg-black/20 rounded-full w-full h-[1.5px] my-3" />
            </div>

            <div className="rounded-lg bg-gray-100 shadow-inner flex flex-col gap-5 p-5">
                {schedule.boat.cabins.map(cabin => (
                    <CabinCard cruiseTitle={schedule.cruise.title} key={cabin.id} cabin={cabin} duration={schedule.cruise.duration} scheduleId={schedule.id} guestCount={guestCount} />
                ))}
            </div>
        </article>
    );
};

const CabinCard = ({ cabin, duration, scheduleId, guestCount, cruiseTitle }: CabinCardProps) => {
    const { account } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState<{ stack: string; field?: string }>({ stack: '', field: '' });
    const setError = useSetAtom(errorAtom);
    const setTransaction = useSetAtom(transactionAtom);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl p-4 shadow-lg">
            {/* Image Section */}
            <div className="relative h-56 md:h-full rounded-xl overflow-hidden">
                <CanvasImage src={cabin.cover} alt={`${cabin.name} cabin preview`} className="object-cover w-full h-full overflow-hidden" />
            </div>

            {/* Details Section */}
            <div className="md:col-span-2 flex flex-col justify-between gap-4 p-3">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{cabin.name}</h2>
                    <p className="text-green-600 text-sm font-semibold mt-1">100% Refund & Reschedule Guarantee</p>
                    <div className="border-t border-gray-200 my-3" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Cabin Features */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                            <IconUserScan size={18} />
                            <span className="text-sm">Max {cabin.maxCapacity} Guests</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <IconBedFilled size={18} />
                            <span className="text-sm capitalize">{cabin.type.toLowerCase()} Bed</span>
                        </div>

                        <div className="flex items-start gap-2 text-gray-600">
                            <IconTextCaption size={18} className="flex-shrink-0" />
                            <RichTextPreview value={cabin.description || ''} />
                        </div>
                    </div>

                    {/* Pricing & Booking */}
                    <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                            <p className="text-brown font-bold text-2xl">${cabin.price.toLocaleString()}.00</p>
                            <p className="text-gray-500 text-sm">/ {duration} days per guest</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setLoading({ stack: 'route', field: String(cabin.id) });
                                try {
                                    if (!account.email) {
                                        setError({
                                            message: 'You must login first!',
                                        });
                                    } else {
                                        setTransaction({
                                            email: account.email,
                                            pax: Number(guestCount),
                                            cabinId: String(cabin.id),
                                            scheduleId: scheduleId,
                                            addons: [],
                                            guests: [],
                                            price: cabin.price,
                                            cruise: {
                                                title: cruiseTitle,
                                            },
                                            discount: '',
                                            subTotal: '',
                                            finalTotal: cabin.price,
                                            amountPayment: '',
                                            amountUnderPayment: '',
                                            method: null,
                                            guestPrice: '',
                                            addonPrice: '',
                                        });
                                        router.push('/booking-itinerary');
                                    }
                                } catch (error) {
                                    fetchError(error, setError);
                                }
                            }}
                            disabled={loading.field === String(cabin.id) && loading.stack === 'route'}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                        >
                            {loading.stack === 'route' && loading.field === String(cabin.id) ? (
                                <>
                                    <IconLoader3 size={20} stroke={2.5} className={'animate-spin'} /> Loading
                                </>
                            ) : (
                                'Book Now'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
