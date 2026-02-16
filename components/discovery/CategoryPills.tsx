'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/discovery/categories';

interface CategoryPillsProps {
    categories: Category[];
    activeSlug?: string | null;
    onSelect?: (slug: string) => void;
}

export default function CategoryPills({
    categories,
    activeSlug,
    onSelect,
}: CategoryPillsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative">
            <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = category.slug === activeSlug;

                    return (
                        <Button
                            key={category.slug}
                            variant={isActive ? 'default' : 'outline'}
                            onClick={() => onSelect?.(category.slug)}
                            className={cn(
                                'flex-shrink-0 gap-2 transition-all',
                                isActive && 'shadow-lg scale-105'
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{category.title}</span>
                        </Button>
                    );
                })}
            </div>

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
