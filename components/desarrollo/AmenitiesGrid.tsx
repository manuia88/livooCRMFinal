'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Amenity } from '@/types/desarrollo';
import * as LucideIcons from 'lucide-react';

interface AmenitiesGridProps {
    amenities: Amenity[];
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Amenidades</h3>
                <p className="text-gray-600">Todo lo que necesitas para vivir mejor</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenities.map((amenity, index) => {
                    // Get the icon component dynamically
                    const IconComponent = (LucideIcons as any)[amenity.icon] as React.ComponentType<{ className?: string }>;

                    return (
                        <Card
                            key={index}
                            className="p-5 hover:shadow-lg transition-shadow duration-200"
                        >
                            {amenity.image ? (
                                <div className="relative h-32 mb-4 rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                        src={amenity.image}
                                        alt={amenity.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-[var(--loft-orange-light)] to-orange-100 rounded-lg">
                                    {IconComponent && (
                                        <IconComponent className="h-12 w-12 text-[var(--loft-orange)]" />
                                    )}
                                </div>
                            )}

                            <h4 className="font-semibold text-gray-900 mb-1 text-center">
                                {amenity.name}
                            </h4>

                            {amenity.description && (
                                <p className="text-xs text-gray-600 text-center">
                                    {amenity.description}
                                </p>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
