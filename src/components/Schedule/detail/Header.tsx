import { CanvasImage } from '@/components/CanvasImage';
import { CarouselImage } from '@/components/CarouselImage';
import { ActionButton } from '@/components/ui/Button/Action.button';
import { CarouselItem } from '@/components/ui/carousel';

import { IconArrowLeft, IconLoader3, IconZoomIn } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const HeaderSection = ({ coverImage, galleries }: { coverImage: string; galleries: { source: string }[] }) => {
    const [loading, setloading] = useState<{ stack: string; field?: string }>({ stack: '', field: '' });
    const router = useRouter();
    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="relative">
                <CanvasImage src={coverImage || ''} className="h-80" />
                <DetailButton />
            </div>

            <CarouselImage navigation>
                {galleries.map((gallery, i) => (
                    <CarouselItem key={i} className="relative basis-1/2">
                        <CanvasImage src={gallery.source || ''} className="h-80" />
                        <DetailButton />
                    </CarouselItem>
                ))}
            </CarouselImage>

            <div className="col-span-2">
                <ActionButton
                    className="flex items-center justify-center gap-1"
                    onClick={() => {
                        setloading({ field: 'back', stack: 'route' });
                        router.push('/');
                    }}
                    title={
                        <>
                            {loading.stack === 'route' && loading.field === 'back' ? <IconLoader3 className="animate-spin" stroke={2} size={20} /> : <IconArrowLeft stroke={2} size={20} />}
                            Back
                        </>
                    }
                    type="button"
                />
            </div>
        </div>
    );
};

const DetailButton = () => (
    <div className="absolute bottom-3 right-3 z-10">
        <button className="px-5 bg-brown/60 text-gray-50 font-semibold text-sm flex items-center justify-center gap-1 py-2 rounded-lg border border-brown hover:bg-brown transition-all ease-in-out duration-300" type="button">
            <IconZoomIn size={18} stroke={2} />
            <span>Detail</span>
        </button>
    </div>
);
