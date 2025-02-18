import React from 'react';
import { twMerge } from 'tailwind-merge';

type propsActionButton = {
    className?: string;
    title: string;
    onClick?: () => void;
};
export const ActionButton: React.FC<propsActionButton> = ({ className, title, onClick }) => (
    <button type="button" onClick={onClick} className={twMerge('py-3 font-bold text-sm text-white bg-brown rounded-2xl px-7', className)}>
        {title}
    </button>
);
