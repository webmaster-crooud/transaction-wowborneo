import React from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel';

export function CarouselImage({ children, navigation = false }: { children: React.ReactNode; navigation?: boolean }) {
    return (
        <Carousel>
            <CarouselContent>{children}</CarouselContent>
            {navigation && (
                <>
                    <CarouselPrevious className="left-3" />
                    <CarouselNext className="right-3" />
                </>
            )}
        </Carousel>
    );
}
