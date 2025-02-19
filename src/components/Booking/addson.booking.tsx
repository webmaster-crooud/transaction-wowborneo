import { IconCircleMinus, IconCirclePlus, IconInfoCircle } from '@tabler/icons-react';
import Image from 'next/image';
import { BookingCard } from '../ui/Card/Booking.card';

interface AddsonInterface {
    title: string;
    description: string;
    image: string;
    price: string;
}

const dataAddson: AddsonInterface[] = [
    {
        title: 'Malahoi Longhouse Tour',
        description: 'Lorem ipsum dolor sit amet consectetur. Luctus fringilla natoque aliquam morbi cras volutpat. Quis ctus fr',
        image: '/addson.jpeg',
        price: '500',
    },
    {
        title: 'Kahayan River Tour',
        description: 'Lorem ipsum dolor sit amet consectetur. Luctus fringilla natoque aliquam morbi cras volutpat. Quis ctus fr',
        image: '/addson.jpeg',
        price: '500',
    },
    {
        title: 'Dayak Cultural & Longhouse Tour',
        description: 'Lorem ipsum dolor sit amet consectetur. Luctus fringilla natoque aliquam morbi cras volutpat. Quis ctus fr',
        image: '/addson.jpeg',
        price: '500',
    },
    {
        title: 'Sebangau National Park',
        description: 'Lorem ipsum dolor sit amet consectetur. Luctus fringilla natoque aliquam morbi cras volutpat. Quis ctus fr',
        image: '/addson.jpeg',
        price: '500',
    },
];

export function AddsonBooking() {
    return dataAddson.map((addson, i) => (
        <BookingCard className="flex flex-col gap-y-3" key={i}>
            <div className="flex items-center justify-between gap-5">
                <div className="flex items-start justify-start gap-3">
                    <div className="w-4/12 object-cover object-center rounded-xl max-h-16 overflow-hidden">
                        <Image src={addson.image} alt={'addson'} width={200} height={200} style={{ width: '100%', height: 'auto' }} priority />
                    </div>
                    <h1 className="font-bold w-full">{addson.title}</h1>
                </div>
                <button>
                    <IconInfoCircle size={20} stroke={2} className="text-brown" />
                </button>
            </div>

            <p className="text-xs">{addson.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-start gap-x-6">
                <h6 className="font-bold text-[20px]">${addson.price}/pax</h6>

                <div className="flex items-center justify-center p-3 border border-brown rounded-xl gap-3">
                    <button>
                        <IconCircleMinus size={18} className="text-brown" />
                    </button>
                    <span className="text-sm text-brown">1</span>
                    <button>
                        <IconCirclePlus size={18} className="text-brown" />
                    </button>
                </div>
            </div>
        </BookingCard>
    ));
}
