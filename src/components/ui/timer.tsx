'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Timer({ timer }: { timer: number }) {
    // 24 jam = 86400 detik
    const [timeLeft, setTimeLeft] = useState(timer);
    const router = useRouter();
    useEffect(() => {
        setTimeLeft(timer);
    }, [timer, router]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
            if (timeLeft === 0) {
                router.push('/');
            }
        }, 1000);

        // Bersihkan interval saat komponen di-unmount
        return () => clearInterval(intervalId);
    }, [router, timeLeft]);

    // Konversi detik menjadi jam, menit, detik
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex items-center justify-center gap-2">
            <div className="bg-red text-white px-5 py-1 rounded-full">{hours} Hour</div>
            <span className="text-red">:</span>
            <div className="bg-red text-white px-5 py-1 rounded-full">{minutes} Minute</div>
            <span className="text-red">:</span>
            <div className="bg-red text-white px-5 py-1 rounded-full">{seconds} Second</div>
        </div>
    );
}
