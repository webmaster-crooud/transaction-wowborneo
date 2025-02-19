import { AddsonBooking } from '@/components/Booking/addson.booking';
import { MainBooking } from '@/components/Booking/main.booking';
import { ServiceBooking } from '@/components/Booking/service.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { Service } from '@/types';

const dataServiceDetail: Service = {
    title: 'Orangutan and Dayak Village Cruises',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati minima ratione possimus.',
    cruise: 'Rahai’i Pangun',
    slug: 'Rahai-i-Pangun',
    image: '/boats-01.jpeg',
    tag: 'MID WEEK',
    date: {
        checkIn: 'March 04, 2025',
        checkOut: 'March 08, 2025',
    },
    cabin: 'Superior',
    price: '800',
    days: '2D1N',
};

export default function BookingIteneraryPage() {
    const service = dataServiceDetail;
    return (
        <>
            <CurtainTransition />

            <MainBooking>
                <>
                    <div>
                        <p className="font-bold  text-2xl mb-3">1. Booking Itinerary</p>
                        <ServiceBooking service={service} />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-bold  text-2xl">2. Adds on</p>
                            <small className="text-gray-400">Complete your journey with our adds on package</small>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <AddsonBooking />
                        </div>
                    </div>
                </>
            </MainBooking>
        </>
    );
}
