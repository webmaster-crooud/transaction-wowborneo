'use client';
import { IconCircleMinus, IconCirclePlus, IconInfoCircle } from '@tabler/icons-react';
import Image from 'next/image';
import { BookingCard } from '../ui/Card/Booking.card';
import { IBookingItineraryResponse } from '@/types/transaction';
import { formatCurrency } from '@/utils/main';
import { useAtom } from 'jotai';
import { transactionAtom } from '@/stores/transaction';

export function AddonBooking({ addons }: { addons: IBookingItineraryResponse['addons'] }) {
    const [transaction, setTransaction] = useAtom(transactionAtom);
    const updateAddonQty = (addonId: number, operation: 'increment' | 'decrement') => {
        setTransaction(prev => {
            const existingIndex = prev.addons.findIndex(a => a.id === addonId);
            const newAddons = [...prev.addons];

            // Cari data addon lengkap dari props
            const selectedAddon = addons.find(a => a.id === addonId);
            const price = Number(selectedAddon?.price || 0);

            if (existingIndex > -1) {
                const currentQty = newAddons[existingIndex].qty;
                const newQty = operation === 'increment' ? currentQty + 1 : Math.max(0, currentQty - 1);

                if (newQty === 0) {
                    newAddons.splice(existingIndex, 1);
                } else {
                    newAddons[existingIndex] = {
                        ...newAddons[existingIndex],
                        qty: newQty,
                        totalPrice: String(newQty * price),
                    };
                }
            } else if (operation === 'increment' && selectedAddon) {
                // Tambahkan data lengkap saat pertama kali increment
                newAddons.push({
                    id: addonId,
                    qty: 1,
                    price: String(price),
                    totalPrice: String(price),
                    title: selectedAddon.title,
                    description: selectedAddon.description || '',
                });
            }

            const addonsPrice = newAddons.reduce((sum, addon) => sum + Number(addon.totalPrice), 0);

            console.log(`Price: ${price} + addonsPrice: ${addonsPrice} = ${price + addonsPrice}`);
            return {
                ...prev,
                addons: newAddons,
                addonPrice: String(addonsPrice), // Simpan ke state
                subTotal: String(Number(prev.price) + addonsPrice),
                finalTotal: String(Number(prev.price) + addonsPrice),
            };
        });
    };

    return addons.map(addon => {
        const selectedAddon = transaction.addons.find(a => a.id === addon.id);
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
                        <button onClick={() => updateAddonQty(addon.id, 'decrement')} disabled={currentQty === 0}>
                            <IconCircleMinus size={18} className={`text-brown ${currentQty === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                        </button>
                        <span className="text-sm text-brown min-w-[20px] text-center">{currentQty}</span>
                        <button onClick={() => updateAddonQty(addon.id, 'increment')}>
                            <IconCirclePlus size={18} className="text-brown" />
                        </button>
                    </div>
                </div>
            </BookingCard>
        );
    });
}
