import { CanvasImage } from '@/components/CanvasImage';
import { IconZoomIn } from '@tabler/icons-react';

export const DeckPreview = ({ deck }: { deck: { cover: string } }) => (
    <div className="relative my-5">
        <CanvasImage src={deck.cover} className="h-96 border-none" />
        <div className="absolute bottom-3 right-3 z-10">
            <button className="px-5 bg-brown/60 text-gray-50 font-semibold text-sm flex items-center justify-center gap-1 py-2 rounded-lg border border-brown hover:bg-brown transition-all ease-in-out duration-300">
                <IconZoomIn size={18} stroke={2} />
                <span>Detail</span>
            </button>
        </div>
    </div>
);
