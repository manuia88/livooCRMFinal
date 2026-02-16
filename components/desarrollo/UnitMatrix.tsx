'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FloorPlan } from '@/types/desarrollo';
import { Bed, Bath, Maximize2, TrendingUp } from 'lucide-react';

interface UnitMatrixProps {
    floorPlans: FloorPlan[];
    onSelectPlan?: (plan: FloorPlan) => void;
}

export function UnitMatrix({ floorPlans, onSelectPlan }: UnitMatrixProps) {
    const formatPrice = (price: number) => {
        return `$${(price / 1000000).toFixed(1)}M`;
    };

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            '1BR': '1 Recámara',
            '2BR': '2 Recámaras',
            '3BR': '3 Recámaras',
            'PH': 'Penthouse',
        };
        return labels[type] || type;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Modelos Disponibles</h3>
                    <p className="text-gray-600 mt-1">Selecciona el modelo que más te guste</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Total disponibles</p>
                    <p className="text-3xl font-bold text-[var(--loft-orange)]">
                        {floorPlans.reduce((sum, fp) => sum + fp.availableUnits, 0)}
                    </p>
                </div>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {floorPlans.map((plan) => (
                    <Card
                        key={plan.id}
                        className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${plan.isPopular ? 'ring-2 ring-[var(--loft-orange)]' : ''
                            }`}
                        onClick={() => onSelectPlan?.(plan)}
                    >
                        {/* Popular Badge */}
                        {plan.isPopular && (
                            <div className="mb-3">
                                <Badge variant="loft" className="text-xs">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Más Popular
                                </Badge>
                            </div>
                        )}

                        {/* Type */}
                        <div className="mb-4">
                            <h4 className="font-bold text-lg text-gray-900 mb-1">
                                {getTypeLabel(plan.type)}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-1">{plan.name}</p>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Bed className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{plan.bedrooms} recámaras</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Bath className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{plan.bathrooms} baños</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Maximize2 className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{plan.area}m²</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">Desde</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatPrice(plan.priceFrom)}
                            </p>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                            <span className="text-sm text-gray-600">Disponibles</span>
                            <span className="font-bold text-[var(--loft-orange)]">
                                {plan.availableUnits}
                            </span>
                        </div>

                        {/* CTA */}
                        <Button
                            size="sm"
                            className="w-full bg-[var(--loft-orange)] hover:bg-[var(--loft-orange-hover)]"
                        >
                            Ver Plano
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
