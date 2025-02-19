import React from 'react';
import { twMerge } from 'tailwind-merge';

export const BookingCard = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={twMerge('p-6 border border-stone-300 rounded-2xl', className)}>{children}</div>;
