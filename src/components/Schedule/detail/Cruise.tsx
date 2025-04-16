import Link from 'next/link';
import { IconShip, IconMapPin, IconCalendar } from '@tabler/icons-react';
import { IDetailScheduleResponse } from '@/types';

export const CruiseDetails = ({ schedule }: { schedule: IDetailScheduleResponse }) => (
    <div className="flex items-start justify-between gap-5 flex-wrap my-5">
        <div className="flex flex-col gap-y-3">
            <h1 className="font-bold text-4xl tracking-wider text-gray-700">{schedule.cruise.title}</h1>
            <div className="flex items-center justify-start gap-5">
                <div className="flex items-center gap-2">
                    <IconShip size={18} stroke={2} className="text-gray-500" />
                    <h2 className="text-sm font-medium text-gray-500">
                        <Link href="/">{schedule.boat.name}</Link>
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <IconMapPin size={18} stroke={2} className="text-gray-500" />
                    <h2 className="text-sm font-medium text-gray-500">
                        <Link href="/">{schedule.cruise.departure}</Link>
                    </h2>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <IconCalendar size={18} stroke={2} className="text-gray-500" />
                <p className="text-sm font-medium text-gray-500">
                    {new Date(schedule.departureAt).toLocaleDateString('en-EN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}{' '}
                    -{' '}
                    {new Date(schedule.arrivalAt).toLocaleDateString('en-EN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>
            </div>
        </div>

        <div className="flex flex-col items-end gap-y-3">
            <p className="text-sm font-medium text-gray-500">Start from</p>
            <p className="text-brown font-bold text-2xl leading-3">$ {schedule.min_price}.00</p>
            <p className="text-sm text-gray-500">/{schedule.cruise.duration} days/ pax</p>
            <a href="#cabin" className="bg-brown px-5 py-2 font-semibold text-gray-50 rounded-lg border-brown border">
                See Cabin
            </a>
        </div>
    </div>
);
