import React from 'react';
import { twMerge } from 'tailwind-merge';

type propsActionButton = {
    title: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
};
export const ActionButton: React.FC<propsActionButton> = ({ className, title, onClick, disabled = false, type = 'button' }) => (
    <button type={type} disabled={disabled} onClick={onClick} className={twMerge('py-3 font-bold text-sm text-white bg-brown rounded-2xl px-7', className)}>
        {title}
    </button>
);
