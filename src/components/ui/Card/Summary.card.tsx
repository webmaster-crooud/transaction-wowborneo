import React from 'react';
import { twMerge } from 'tailwind-merge';

type propsSummaryCard = {
    title: string;
    children?: React.ReactNode;
    className?: string;
};

export const SummaryCard: React.FC<propsSummaryCard> = ({ title, children, className }) => (
    <div className="rounded-lg border border-stone-200 overflow-hidden">
        <div className="p-3 bg-stone-100 text-black">
            {/* Header */}
            <h4 className="text-[16px] font-bold">{title}</h4>
        </div>
        {/* Body */}
        {children && <div className={twMerge('p-3 flex flex-col gap-2 text-gray-500 text-sm', className)}>{children}</div>}
    </div>
);
