import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type propsCanvasImage = {
    src: string;
    alt?: string;
    className?: string;
};
export function CanvasImage({ src, alt = 'Image By Wow Borneo', className }: propsCanvasImage) {
    return <Image src={src || '/boats-01.jpeg'} alt={alt} className={twMerge('w-full h-full object-cover object-center border border-black', className)} width={1000} height={1000} priority quality={100} />;
}
