'use client';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

import React from 'react';

interface StepInteface {
    title: string;
    url: string;
}

const dataSteps: StepInteface[] = [
    {
        title: 'Booking Itinerary',
        url: '/booking-itinerary',
    },
    {
        title: 'Guest Details',
        url: '/guest-details',
    },
    {
        title: 'Payment',
        url: '/payment',
    },
    {
        title: 'Confirm',
        url: '/confirm',
    },
];

export function Steps() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        (pathName === '/booking-itinerary' || pathName === '/guest-details' || pathName === '/payment' || pathName === '/confirm') && (
            <div className="px-12 relative z-40 py-3 flex items-center justify-center bg-light-brown gap-5">
                {dataSteps.map((steps, i) => (
                    <React.Fragment key={i + 1}>
                        <motion.button initial={{ x: '100rem', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, delay: i * 0.3 }} type="button" className="flex items-center justify-center gap-5" onClick={() => router.push(steps.url)}>
                            <div className={`flex items-center rounded-full h-8 w-8 justify-center border border-brown ${pathName === steps.url ? 'bg-brown' : 'bg-transparent'}`}>
                                <span className={`${pathName === steps.url ? 'text-white' : 'text-brown'} text-[17px] font-bold`}>{i + 1}</span>
                            </div>
                            <p className={`text-black text-sm ${pathName === steps.url && 'font-bold'}`}>{steps.title}</p>
                        </motion.button>
                        {dataSteps.indexOf(steps, 3) === 3 ? null : <div className="w-10 h-[0.5px] bg-brown" />}
                    </React.Fragment>
                ))}
            </div>
        )
    );
}
