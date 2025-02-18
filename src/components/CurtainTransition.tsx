'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Variants untuk animasi tirai
const curtainVariants = {
    // Tirai muncul: menutupi layar (y = 0)
    initial: { y: '0%', opacity: 0, transition: { duration: 0.5 } },
    // Tirai tersembunyi: tergeser ke atas (y = -100%)
    animate: { y: '0%', opacity: 1, transition: { duration: 0.5 } },
    exit: { y: '-100%', opacity: 1, transition: { duration: 0.5 } },
};

export default function CurtainTransition() {
    const pathname = usePathname();
    const [showCurtain, setShowCurtain] = useState(true);

    useEffect(() => {
        // Setiap kali route berubah, tampilkan tirai
        setShowCurtain(true);

        // Setelah delay (misal 600ms), animasikan tirai ke atas agar konten tampak
        const timer = setTimeout(() => {
            setShowCurtain(false);
        }, 1500); // sesuaikan timing sesuai kebutuhan

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence>
            {showCurtain && (
                <motion.div key="curtain" className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center" initial="initial" animate="animate" exit="exit" variants={curtainVariants}>
                    <div>
                        <Image src={'/images/logo.svg'} width={200} height={200} priority alt="Wow Borneo" className="w-full mx-auto object-cover object-center invert" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
