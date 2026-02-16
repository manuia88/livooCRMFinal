import { Check } from 'lucide-react';

interface PropertyFeaturesProps {
    features?: {
        interior?: string[];
        exterior?: string[];
        security?: string[];
        amenities?: string[];
    };
}

const defaultFeatures = {
    interior: [
        'Cocina integral',
        'Closets empotrados',
        'Piso de madera',
        'Ventanas amplias',
    ],
    exterior: ['Balcón', 'Vista panorámica'],
    security: ['Seguridad 24/7', 'Acceso controlado', 'CCTV'],
    amenities: ['Gimnasio', 'Alberca', 'Roof garden', 'Área de coworking'],
};

export default function PropertyFeatures({
    features = defaultFeatures,
}: PropertyFeaturesProps) {
    const categories = [
        { title: 'Interior', items: features.interior || [] },
        { title: 'Exterior', items: features.exterior || [] },
        { title: 'Seguridad', items: features.security || [] },
        { title: 'Amenidades', items: features.amenities || [] },
    ];

    const activeCategories = categories.filter((cat) => cat.items.length > 0);

    if (activeCategories.length === 0) return null;

    return (
        <div className="space-y-6">
            {activeCategories.map((category) => (
                <div key={category.title}>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-3">
                        {category.title}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.items.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="bg-green-100 p-0.5 rounded-full flex-shrink-0">
                                    <Check className="h-4 w-4 text-green-600" />
                                </div>
                                <span className="text-sm text-[var(--text-secondary)]">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
