'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { Desarrollo } from '@/types/desarrollo';

interface DesarrolloCardProps {
    desarrollo: Desarrollo;
    size?: 'medium' | 'large';
}

export function DesarrolloCard({ desarrollo, size = 'medium' }: DesarrolloCardProps) {
    const isLarge = size === 'large';

    const getStatusBadge = () => {
        switch (desarrollo.status) {
            case 'presale':
                return <Badge variant="success">Preventa</Badge>;
            case 'construction':
                return <Badge variant="default">En Construcción</Badge>;
            case 'ready':
                return <Badge variant="loft">Listo para Entrega</Badge>;
        }
    };

    return (
        <Link href={`/desarrollos/${desarrollo.slug}`} className="block group">
            <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${isLarge ? 'h-[500px]' : 'h-[420px]'}`}>
                {/* Image */}
                <div className={`relative ${isLarge ? 'h-[280px]' : 'h-[220px]'} overflow-hidden bg-gray-100`}>
                    <Image
                        src={desarrollo.coverImage}
                        alt={desarrollo.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        {getStatusBadge()}
                    </div>

                    {/* Sold Percentage Badge */}
                    {desarrollo.soldPercentage > 0 && (
                        <div className="absolute top-4 right-4 z-10">
                            <Badge variant="destructive" className="bg-red-500">
                                {desarrollo.soldPercentage}% vendido
                            </Badge>
                        </div>
                    )}

                    {/* Developer */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                        <p className="text-white/90 text-sm font-medium mb-1">
                            {desarrollo.developer}
                        </p>
                        <h3 className={`text-white font-bold leading-tight ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                            {desarrollo.name}
                        </h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Location */}
                    <div className="flex items-start gap-2 text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-1">
                            {desarrollo.address.neighborhood}, {desarrollo.address.city}
                        </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {desarrollo.tagline}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                                <Building2 className="h-3.5 w-3.5" />
                                <span>Disponibles</span>
                            </div>
                            <p className="font-semibold text-gray-900">
                                {desarrollo.availableUnits} de {desarrollo.totalUnits}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>Entrega</span>
                            </div>
                            <p className="font-semibold text-gray-900">
                                {desarrollo.deliveryDate}
                            </p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline justify-between mb-4">
                        <div>
                            <span className="text-gray-500 text-xs">Desde</span>
                            <p className="text-2xl font-bold text-[var(--loft-orange)]">
                                ${(desarrollo.priceFrom / 1000000).toFixed(1)}M
                            </p>
                        </div>

                        {/* Progress */}
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span>Avance</span>
                            </div>
                            <p className="font-semibold text-gray-900">
                                {desarrollo.constructionProgress}%
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        className="w-full bg-[var(--loft-orange)] hover:bg-[var(--loft-orange-hover)]"
                        size="sm"
                    >
                        Ver Desarrollo
                    </Button>
                </div>
            </Card>
        </Link>
    );
}
