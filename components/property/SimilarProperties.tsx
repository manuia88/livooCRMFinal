import { Property } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SimilarPropertiesProps {
    currentProperty: Property;
    allProperties: Property[];
    limit?: number;
}

export default function SimilarProperties({
    currentProperty,
    allProperties,
    limit = 4,
}: SimilarPropertiesProps) {
    // Filter similar properties
    const similarProperties = allProperties
        .filter((prop) => {
            // Exclude current property
            if (prop.id === currentProperty.id) return false;

            // Same alcaldía/zona
            if (prop.address.alcaldia !== currentProperty.location.alcaldia) {
                return false;
            }

            // Same property type
            if (prop.type !== currentProperty.type) return false;

            // Similar price range (±30%)
            const priceDiff = Math.abs(prop.price - currentProperty.price);
            const priceThreshold = currentProperty.price * 0.3;
            if (priceDiff > priceThreshold) return false;

            return true;
        })
        .slice(0, limit);

    if (similarProperties.length === 0) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Propiedades Similares
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProperties.map((property) => (
                    <Link key={property.id} href={`/propiedades/${property.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                            {/* Image */}
                            <div className="relative h-48 w-full">
                                <Image
                                    src={property.images[0]}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-2 right-2">
                                    {property.transaction}
                                </Badge>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-1">
                                    {property.title}
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)] mb-3">
                                    <MapPin className="h-4 w-4 flex-shrink-0" />
                                    <span className="line-clamp-1">
                                        {property.address.neighborhood}, {property.address.alcaldia}
                                    </span>
                                </div>

                                <div className="text-2xl font-bold text-[var(--primary)] mb-3">
                                    {formatPrice(property.price)}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                                    <div className="flex items-center gap-1">
                                        <Bed className="h-4 w-4" />
                                        <span>{property.bedrooms}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bath className="h-4 w-4" />
                                        <span>{property.bathrooms}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Home className="h-4 w-4" />
                                        <span>{property.area}m²</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
