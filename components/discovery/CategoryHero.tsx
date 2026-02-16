'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CategoryHeroProps {
    onSearch?: (query: string) => void;
}

export default function CategoryHero({ onSearch }: CategoryHeroProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(query);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                    Descubre tu hogar ideal
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
                    Busca por estilo de vida, no solo por metros cuadrados
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="¿Qué buscas? Ej: alberca, vista, moderno..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-14 pl-12 pr-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl"
                        />
                    </div>
                </form>

                {/* Popular Searches */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-white/70">Popular:</span>
                    {['Pet-Friendly', 'Con Alberca', 'Vista Panorámica', 'Roof Garden'].map(
                        (tag) => (
                            <button
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className="text-sm text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full transition-colors"
                            >
                                {tag}
                            </button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
