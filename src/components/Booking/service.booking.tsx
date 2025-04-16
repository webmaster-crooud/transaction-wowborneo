import Image from 'next/image';
import { BookingCard } from '../ui/Card/Booking.card';
import { IBookingItineraryResponse, ITransactionRequest } from '@/types/transaction';
import { RichTextPreview } from '../ui/RichTextPreview';
import { formatDateOnly } from '@/lib/moment';

export const ServiceBooking = ({ service, transaction }: { service: IBookingItineraryResponse; transaction: ITransactionRequest }) => (
    <BookingCard>
        <div className="flex items-center justify-start gap-5">
            <Image src={service.cruise.cover || 'boats-01.jpeg'} alt={service.cruise.title} width={200} height={200} priority className="w-3/12 object-cover object-center rounded-xl" />
            <div className="flex flex-col gap-y-5">
                <h1 className="font-bold text-[20px]">{service.cruise.title}</h1>
                <RichTextPreview value={service.cruise.description} />
            </div>
        </div>

        <div className="mt-10 flex flex-col gap-y-3">
            <div className="flex items-center justify-between gap-5">
                <b className="text-gray-500">Departure</b>
                <p className="text-gray-500">
                    {service.cruise.departure} ({service.cruise.duration} Days)
                </p>
            </div>
            <div className="flex items-center justify-between gap-5">
                <b className="text-gray-500">Cruise Check in</b>
                <p className="text-gray-500">{formatDateOnly(service.departureAt)}</p>
            </div>
            <div className="flex items-center justify-between gap-5">
                <b className="text-gray-500">Cruise Check out</b>
                <p className="text-gray-500">{formatDateOnly(service.arrivalAt)}</p>
            </div>
            <div className="flex items-center justify-between gap-5">
                <b className="text-gray-500">Boat</b>
                <p className="text-gray-500">{String(service.cruise.title)}</p>
            </div>
            <div className="flex items-center justify-between gap-5">
                <b className="text-gray-500">Guest</b>
                <p className="text-gray-500">{transaction.pax} Person</p>
            </div>
            <div className="flex items-center justify-between gap-5">
                <b className="text-gray-500">Type Room & Bed</b>
                <p className="text-gray-500 capitalize">{service.boat.cabin.type.toLowerCase()} Cabin</p>
            </div>
        </div>
    </BookingCard>
);
