'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ActionButton } from '../ui/Button/Action.button';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { SummaryBooking } from './summary.booking';
import { usePathname, useRouter } from 'next/navigation';
export const MainBooking = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const router = useRouter();
    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="relative my-20 grid xl:grid-cols-3 gap-5">
            <div className="flex flex-col gap-y-8 col-span-2 min-h-screen">{children}</div>

            <SummaryBooking />
            {pathName !== '/confirmation' && (
                <div className="flex items-center justify-start gap-6 mt-10 col-span-3">
                    {/* Summary */}
                    <ActionButton
                        onClick={() => router.back()}
                        className="px-16 flex items-center justify-center gap-4"
                        title={
                            <>
                                <IconArrowLeft size={20} stroke={2} /> <span>Back</span>
                            </>
                        }
                    />
                    <ActionButton
                        className="px-16 flex items-center justify-center gap-4"
                        onClick={() => router.push(pathName === '/booking-itinerary' ? '/guest-details' : pathName === '/guest-details' ? '/payment' : pathName === '/payment' ? '/confirmation' : '/')}
                        title={
                            <>
                                <span>Continue</span>
                                <IconArrowRight size={20} stroke={2} />
                            </>
                        }
                    />
                </div>
            )}
        </motion.section>
    );
};
