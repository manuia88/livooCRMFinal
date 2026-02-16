import { Home, Bed, Bath, Car, Building2, Calendar } from 'lucide-react';
import { Property } from '@/lib/types';

interface PropertySpecsProps {
    property: Property;
}

export default function PropertySpecs({ property }: PropertySpecsProps) {
    const specs = [
        {
            icon: Home,
            label: 'Área',
            value: `${property.area} m²`,
        },
        {
            icon: Bed,
            label: 'Recámaras',
            value: property.bedrooms,
        },
        {
            icon: Bath,
            label: 'Baños',
            value: property.bathrooms,
        },
        {
            icon: Car,
            label: 'Estacionamiento',
            value: property.parking || 'No incluido',
        },
        {
            icon: Building2,
            label: 'Piso',
            value: property.floor || 'N/A',
        },
        {
            icon: Calendar,
            label: 'Antigüedad',
            value: property.yearBuilt
                ? `${new Date().getFullYear() - property.yearBuilt} años`
                : 'N/A',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="bg-[var(--primary)]/10 p-2 rounded">
                            <Icon className="h-5 w-5 text-[var(--primary)]" />
                        </div>
                        <div>
                            <div className="text-xs text-[var(--text-secondary)]">
                                {spec.label}
                            </div>
                            <div className="font-semibold text-[var(--text-primary)]">
                                {spec.value}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
