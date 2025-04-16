'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActionButton } from '../ui/Button/Action.button';
import { IconArrowLeft, IconArrowRight, IconLoader3 } from '@tabler/icons-react';
import { SummaryBooking } from './summary.booking';
import { usePathname, useRouter } from 'next/navigation';
export const MainBooking = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [loading, setLoadin] = useState<{ stack: string; field?: string }>({ stack: '', field: '' });
    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="relative my-20 grid xl:grid-cols-3 gap-5">
            <div className="flex flex-col gap-y-8 col-span-2 min-h-screen">{children}</div>

            <SummaryBooking />
            {pathName !== '/confirmation' && pathName !== '/payment' && (
                <div className="flex items-center justify-start gap-6 mt-10 col-span-3">
                    {/* Summary */}
                    <ActionButton
                        onClick={() => {
                            setLoadin({ stack: 'route', field: 'back' });
                            router.back();
                        }}
                        className="px-16 flex items-center justify-center gap-4"
                        title={
                            loading.stack === 'route' && loading.field === 'back' ? (
                                <>
                                    <IconLoader3 className="animate-spin" size={20} stroke={2} /> <span>Back</span>
                                </>
                            ) : (
                                <>
                                    <IconArrowLeft size={20} stroke={2} /> <span>Back</span>
                                </>
                            )
                        }
                    />
                    <ActionButton
                        className="px-16 flex items-center justify-center gap-4"
                        onClick={() => {
                            setLoadin({ stack: 'route', field: 'next' });
                            router.push(pathName === '/booking-itinerary' ? '/guest-details' : pathName === '/guest-details' ? '/payment' : pathName === '/payment' ? '/confirmation' : '/');
                        }}
                        title={
                            loading.stack === 'route' && loading.field === 'next' ? (
                                <>
                                    <span>Continue</span>
                                    <IconLoader3 className="animate-spin" size={20} stroke={2} />
                                </>
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <IconArrowRight size={20} stroke={2} />
                                </>
                            )
                        }
                    />
                </div>
            )}
        </motion.section>
    );
};
