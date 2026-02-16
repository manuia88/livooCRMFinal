import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getCategoryBySlug, categories } from '@/lib/discovery/categories';
import {
    getPropertiesByCategory,
    getCategoryStats,
    getRelatedCategories,
} from '@/lib/discovery/filters';
import { mockProperties } from '@/lib/mock-data/properties';
import CategoryCard from '@/components/discovery/CategoryCard';
import { getCategoryPropertyCount } from '@/lib/discovery/filters';
import { MapPin, Bed, Bath, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const category = getCategoryBySlug(params.slug);

    if (!category) {
        return {
            title: 'Categoría no encontrada | Livoo',
        };
    }

    const stats = getCategoryStats(params.slug, mockProperties);

    return {
        title: `${category.title} - ${stats.count} Propiedades | Livoo`,
        description: `${category.description}. Descubre ${stats.count} propiedades perfectas para ti.`,
        openGraph: {
            title: `${category.title} | Livoo`,
            description: category.description,
            type: 'website',
        },
    };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const category = getCategoryBySlug(params.slug);

    if (!category) {
        notFound();
    }

    const properties = getPropertiesByCategory(params.slug, mockProperties);
    const stats = getCategoryStats(params.slug, mockProperties);
    const relatedCategories = getRelatedCategories(params.slug, 3);
    const Icon = category.icon;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <section
                className={`relative bg-gradient-to-br ${category.gradient} text-white`}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                            <Icon className="h-10 w-10" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{category.title}</h1>
                            <p className="text-lg text-white/90">{category.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <Badge className="bg-white/90 text-gray-900 text-sm">
                            {stats.count} {stats.count === 1 ? 'propiedad' : 'propiedades'}
                        </Badge>
                        {stats.avgPrice > 0 && (
                            <Badge className="bg-white/90 text-gray-900 text-sm">
                                Precio promedio: {formatPrice(stats.avgPrice)}
                            </Badge>
                        )}
                        {stats.avgArea > 0 && (
                            <Badge className="bg-white/90 text-gray-900 text-sm">
                                Área promedio: {stats.avgArea}m²
                            </Badge>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* No Properties Found */}
                {properties.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                            No hay propiedades disponibles
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-8">
                            Actualmente no tenemos propiedades en esta categoría, pero estamos
                            trabajando para añadir más opciones pronto.
                        </p>
                        <Link
                            href="/descubrir"
                            className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Ver todas las categorías
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Property Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                            {properties.map((property) => (
                                <Link
                                    key={property.id}
                                    href={`/propiedades/${property.id}`}
                                >
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
                                                {property.operation}
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
                                                    {property.address.neighborhood}, {property.address.city}
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

                        {/* Related Categories */}
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                                Categorías Relacionadas
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedCategories.map((relatedCategory) => (
                                    <CategoryCard
                                        key={relatedCategory.slug}
                                        category={relatedCategory}
                                        propertyCount={getCategoryPropertyCount(
                                            relatedCategory.slug,
                                            mockProperties
                                        )}
                                        size="medium"
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
