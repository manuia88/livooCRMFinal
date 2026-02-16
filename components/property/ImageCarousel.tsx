'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Handle fullscreen toggle
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Handle keyboard navigation in fullscreen
    useEffect(() => {
        if (!isFullscreen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFullscreen(false);
            if (e.key === 'ArrowLeft') scrollPrev();
            if (e.key === 'ArrowRight') scrollNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, scrollPrev, scrollNext]);

    return (
        <>
            {/* Main Carousel */}
            <div className="relative w-full bg-gray-900">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative min-w-0 flex-[0_0_100%]"
                                style={{ height: '500px' }}
                            >
                                <Image
                                    src={image}
                                    alt={`${alt} - Imagen ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedIndex + 1} / {images.length}
                </div>

                {/* Fullscreen Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
                    onClick={toggleFullscreen}
                >
                    <Maximize2 className="h-5 w-5" />
                </Button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 p-4 overflow-x-auto bg-gray-50">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${index === selectedIndex
                                ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20'
                                : 'border-transparent hover:border-gray-300'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-black">
                    <div className="relative w-full h-full">
                        <div className="overflow-hidden h-full" ref={emblaRef}>
                            <div className="flex h-full">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative min-w-0 flex-[0_0_100%] h-full"
                                    >
                                        <Image
                                            src={image}
                                            alt={`${alt} - Imagen ${index + 1}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fullscreen Navigation */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                            onClick={scrollPrev}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                            onClick={scrollNext}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </Button>

                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                            onClick={toggleFullscreen}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        {/* Fullscreen Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
