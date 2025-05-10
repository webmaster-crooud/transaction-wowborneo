'use client';
import { useAtom } from 'jotai';
import { SummaryCard } from '../ui/Card/Summary.card';
import { formatCurrency } from '@/utils/main';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSchedule } from '@/hooks/useSchedule';
import { transactionAtom } from '@/stores/transaction';

export function SummaryBooking() {
    const [transaction] = useAtom(transactionAtom);
    const { schedule } = useSchedule(transaction?.scheduleId || '');
    const router = useRouter();
    useEffect(() => {
        if (!transaction) {
            router.push('/');
        }
    }, [router, transaction]);

    // Calculate adults and children counts
    const adults = transaction.guests.filter(guest => !guest.children).length;
    const children = transaction.guests.filter(guest => guest.children).length;

    // Calculate cruise subtotal with 50% discount for children
    // const cruiseSubtotal = adults * Number(transaction.price) + children * Number(transaction.price) * 0.5;

    // // Calculate total price including addons
    // const totalPrice = transaction.addons.reduce((sum, addon) => sum + Number(addon.totalPrice), cruiseSubtotal);

    return (
        <div className="gap-5 relative top-0">
            <div className="flex flex-col gap-5 col-span-2 p-6 border sticky top-5 border-stone-300 rounded-2xl">
                <div className="flex items-center justify-between gap-5">
                    <h3 className="font-bold text-2xl">Booking Summary</h3>
                    <span className="bg-red text-white p-2 px-5 uppercase font-bold text-xs rounded-full">On Process</span>
                </div>

                <div className="flex flex-col gap-y-6">
                    <SummaryCard title={`Cruise: ${transaction.cruise?.title || ''}`} />

                    {/* Addons */}
                    {transaction.addons.length > 0 && (
                        <SummaryCard title="Adds On">
                            {transaction.addons.map(addon => (
                                <div key={addon.id} className="flex flex-col gap-y-3">
                                    <div className="flex items-start justify-between gap-1">
                                        <div>
                                            <h5 className="font-bold">{addon.title}</h5>
                                            <p className="text-xs" dangerouslySetInnerHTML={{ __html: addon.description || '' }} />
                                        </div>
                                        <div className="text-xs font-semibold">[{addon.qty}]</div>
                                    </div>
                                </div>
                            ))}
                        </SummaryCard>
                    )}

                    {/* Price Breakdown */}
                    {transaction.guests.length > 0 && (
                        <SummaryCard title="Price" className="gap-4">
                            <>
                                {/* Adult Pricing */}
                                {adults > 0 && (
                                    <div className="flex items-center justify-between gap-5">
                                        <span>
                                            {adults} Adult{adults !== 1 ? 's' : ''}
                                        </span>
                                        {schedule?.totalBooking !== 0 && <p className="font-medium text-gray-600">{formatCurrency(String(adults * Number(transaction.price)))}</p>}
                                    </div>
                                )}

                                {/* Children Pricing */}
                                {children > 0 && (
                                    <div className="flex items-center justify-between gap-5">
                                        <span>
                                            {children} Child{children !== 1 ? 'ren' : ''} (50% off)
                                        </span>
                                        {schedule?.totalBooking !== 0 && <p className="font-medium text-gray-600">{formatCurrency(String(children * Number(transaction.price) * 0.5))}</p>}
                                    </div>
                                )}

                                {/* Addons Pricing */}

                                {transaction.addonPrice && (
                                    <>
                                        <div className="border-b-2 border-gray-300 border-dashed w-full h-1" />
                                        <div className="flex items-center justify-between gap-5 font-semibold text-black">
                                            <span>Addons Total Price </span>
                                            <p>{formatCurrency(String(transaction.addonPrice))}</p>
                                        </div>
                                    </>
                                )}
                                {schedule?.totalBooking && (
                                    <>
                                        <div className="flex items-center justify-between gap-5 font-semibold text-black">
                                            <span>Guest Total Price </span>
                                            <p>{formatCurrency(String(transaction.guestPrice))}</p>
                                        </div>
                                        <div className="border-b-2 border-gray-300 border-dashed w-full h-1" />
                                        <div className="flex items-center justify-between gap-5 font-bold text-black">
                                            <span>Total Payment</span>
                                            <p>{formatCurrency(String(transaction.subTotal))}</p>
                                        </div>
                                        {transaction.discount !== 0 && (
                                            <div className="flex items-center justify-between gap-5 font-bold text-black">
                                                <span>Commision</span>
                                                <p>
                                                    ({transaction.discount}%) {formatCurrency(String((Number(transaction.subTotal) * Number(transaction.discount)) / 100))}
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        </SummaryCard>
                    )}
                </div>

                {transaction.finalTotal && (
                    <div className="flex items-center justify-between gap-5">
                        <h6 className="text-2xl font-bold">Payment</h6>
                        <p className="text-[20px] font-bold">{formatCurrency(String(transaction.finalTotal))}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
