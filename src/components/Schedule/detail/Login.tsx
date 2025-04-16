import { IconDiscount2 } from '@tabler/icons-react';
import Link from 'next/link';

export const LoginPromo = ({ scheduleId, guest }: { scheduleId: string; guest: string }) => (
    <div className="my-5 bg-red/10 rounded-lg p-4 flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                <IconDiscount2 size={25} stroke={1.8} className="text-brown animate-bounce" />
            </div>
            <p className="text-gray-600 font-semibold text-sm">Please log in to access our special promotion!</p>
        </div>

        <Link href={`${process.env.NEXT_PUBLIC_AUTH}?from=${scheduleId}&guest=${guest}`} className="px-5 py-2 text-sm font-bold bg-gray-50 text-gray-800 rounded-lg">
            Login
        </Link>
    </div>
);
