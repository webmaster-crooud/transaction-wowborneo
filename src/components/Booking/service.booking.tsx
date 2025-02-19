import { Service } from '@/types';
import Image from 'next/image';
import { BookingCard } from '../ui/Card/Booking.card';

export function ServiceBooking({ service }: { service: Service }) {
    return (
        <BookingCard>
            <div className="flex items-center justify-start gap-5">
                <Image src={service.image} alt={service.cruise} width={200} height={200} priority className="w-3/12 object-cover object-center rounded-xl" />
                <div className="flex flex-col gap-y-5">
                    <h1 className="font-bold text-[20px]">{service.title}</h1>
                    <p>{service.description}</p>
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-y-3">
                <div className="flex items-center justify-between gap-5">
                    <b className="text-gray-500">Cruise Check in</b>
                    <p className="text-gray-500">{String(service.date.checkIn)}</p>
                </div>
                <div className="flex items-center justify-between gap-5">
                    <b className="text-gray-500">Cruise Check out</b>
                    <p className="text-gray-500">{String(service.date.checkOut)}</p>
                </div>
                <div className="flex items-center justify-between gap-5">
                    <b className="text-gray-500">Boat</b>
                    <p className="text-gray-500">{String(service.cruise)}</p>
                </div>
                <div className="flex items-center justify-between gap-5">
                    <b className="text-gray-500">Guest</b>
                    <p className="text-gray-500">3 Adult, 1 Children</p>
                </div>
                <div className="flex items-center justify-between gap-5">
                    <b className="text-gray-500">Type Room & Bed</b>
                    <p className="text-gray-500">{service.cabin} Cabin</p>
                </div>
            </div>
        </BookingCard>
    );
}
