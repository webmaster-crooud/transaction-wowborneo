'use client';
import { IScheduleResponse } from '@/types';
import { formatCurrency } from '@/utils/main';
import { IconLoader3 } from '@tabler/icons-react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TableService({ services, guest }: { services: IScheduleResponse[]; guest: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState<{ stack: string; field?: string }>({ stack: '', field: '' });
    return (
        <section className="w-full my-5 border border-brown rounded-2xl overflow-hidden">
            <div className="overflow-y-scroll scroll-smooth w-full h-[504px]">
                {services.map((service, i) => (
                    <div className={`p-6 ${i % 2 === 0 ? 'bg-brown/10' : 'bg-brown/5'} w-full flex items-center justify-between gap-6`} key={i}>
                        <div className="flex items-center justify-start gap-3">
                            <Image src={service.cover || ''} width={200} height={200} alt={`${service.cruiseTitle} by Wow Borneo`} priority className="w-14 h-14 object-cover object-center rounded-full" />
                            <div>
                                <div className="flex items-center justify-start gap-3">
                                    <h2>{service.cruiseTitle}</h2>
                                    <span>
                                        [
                                        {new Date(service.departureAt).toLocaleDateString('en-EN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}{' '}
                                        -{' '}
                                        {new Date(service.arrivalAt).toLocaleDateString('en-EN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                        ]
                                    </span>
                                </div>
                                <h3 className="font-bold text-sm">
                                    Departure at {service.departure}, {service.boatName}&apos;s Boat
                                </h3>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                router.push(`/${service.id}?guest=${guest}`);
                                setLoading({ stack: 'route', field: service.id });
                            }}
                            className="py-3 px-6 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-1 text-center text-[20px]"
                            disabled={loading.stack === 'route'}
                        >
                            {loading.stack === 'route' && loading.field === service.id ? (
                                <>
                                    <IconLoader3 size={25} stroke={2.5} className="animate-spin" /> Loading
                                </>
                            ) : (
                                <>
                                    Start {formatCurrency(service.minPrice.toString())}/ {service.duration} Days/Pax
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
