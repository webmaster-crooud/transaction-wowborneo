'use client';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Steps } from '../Steps';

export function MainNavbar() {
    const router = useRouter();
    return (
        <>
            <nav className="w-full max-w-screen-2xl z-50 relative">
                <div className="flex items-center justify-between text-white gap-5 bg-brown py-6 px-12">
                    <Image src={'/images/logo.svg'} alt="Logo Wow Borneo" priority width={200} height={200} className="max-w-32" />
                    <button type="button" onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOME}`)}>
                        <IconX size={35} stroke={2} />
                    </button>
                </div>

                <Steps />
            </nav>
        </>
    );
}
