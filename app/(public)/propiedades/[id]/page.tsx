import { notFound } from 'next/navigation';
import { mockProperties } from '@/lib/mock-data/properties';
import ImageCarousel from '@/components/property/ImageCarousel';
import PropertySpecs from '@/components/property/PropertySpecs';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import MortgageCalculator from '@/components/property/MortgageCalculator';
import AgentCard from '@/components/property/AgentCard';
import ContactForms from '@/components/property/ContactForms';
import SimilarProperties from '@/components/property/SimilarProperties';
import PropertyMap from '@/components/property/PropertyMap';
import ShareButtons from '@/components/property/ShareButtons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, MessageCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PropertyPageProps {
    params: {
        id: string;
    };
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: PropertyPageProps): Promise<Metadata> {
    const property = mockProperties.find((p) => p.id === params.id);

    if (!property) {
        return {
            title: 'Propiedad no encontrada | Livoo',
        };
    }

    return {
        title: `${property.title} | Livoo`,
        description: property.description.substring(0, 160),
        openGraph: {
            title: property.title,
            description: property.description,
            images: [property.images[0]],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: property.title,
            description: property.description,
            images: [property.images[0]],
        },
    };
}

export default function PropertyPage({ params }: PropertyPageProps) {
    const property = mockProperties.find((p) => p.id === params.id);

    if (!property) {
        notFound();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const propertyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://livoo.mx'}/propiedades/${property.id}`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Image Carousel */}
            <ImageCarousel images={property.images} alt={property.title} />

            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Link href="/" className="hover:text-[var(--primary)]">
                            Inicio
                        </Link>
                        <span>/</span>
                        <Link href="/buscar" className="hover:text-[var(--primary)]">
                            Buscar
                        </Link>
                        <span>/</span>
                        <span className="text-[var(--text-primary)]">{property.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge className="text-sm">{property.transaction}</Badge>
                                <Badge variant="outline" className="text-sm">
                                    {property.type}
                                </Badge>
                                <Badge
                                    variant={property.status === 'Disponible' ? 'default' : 'secondary'}
                                    className="text-sm"
                                >
                                    {property.status}
                                </Badge>
                            </div>
                            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                                {property.title}
                            </h1>
                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <MapPin className="h-5 w-5 flex-shrink-0" />
                                <span className="text-lg">
                                    {property.location.neighborhood}, {property.location.alcaldia}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold text-[var(--primary)] mb-2">
                                {formatPrice(property.price)}
                            </div>
                            <ShareButtons propertyTitle={property.title} propertyUrl={propertyUrl} />
                        </div>
                    </div>

                    {/* Quick CTA */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <Button
                            className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 gap-2"
                            onClick={() => {
                                const message = encodeURIComponent(
                                    `Hola, me interesa ${property.title}. ¿Podrías darme más información?`
                                );
                                window.open(`https://wa.me/5512345678?text=${message}`, '_blank');
                            }}
                        >
                            <MessageCircle className="h-5 w-5" />
                            Contactar por WhatsApp
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none gap-2">
                            <Calendar className="h-5 w-5" />
                            Agendar Visita
                        </Button>
                    </div>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Specifications */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                                Características
                            </h2>
                            <PropertySpecs property={property} />
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                                Descripción
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                                Amenidades y Extras
                            </h2>
                            <PropertyFeatures />
                        </div>

                        {/* Map */}
                        <PropertyMap
                            latitude={property.location.coordinates.lat}
                            longitude={property.location.coordinates.lng}
                            title={property.title}
                        />
                    </div>

                    {/* Right Column - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-4">
                            {/* Mortgage Calculator */}
                            <MortgageCalculator propertyPrice={property.price} />

                            {/* Contact Forms */}
                            <ContactForms propertyId={property.id} propertyTitle={property.title} />

                            {/* Agent Card */}
                            <AgentCard />
                        </div>
                    </div>
                </div>

                {/* Similar Properties */}
                <SimilarProperties
                    currentProperty={property}
                    allProperties={mockProperties}
                    limit={4}
                />

                {/* Footer Info */}
                <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--text-secondary)]">
                        <div>
                            <span>ID de Propiedad: </span>
                            <span className="font-mono font-medium">{property.id}</span>
                        </div>
                        <div>
                            Última actualización: {new Date().toLocaleDateString('es-MX')}
                        </div>
                    </div>
                </div>
            </div>

            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org/',
                        '@type': 'RealEstateListing',
                        name: property.title,
                        description: property.description,
                        price: property.price,
                        priceCurrency: 'MXN',
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: property.location.neighborhood,
                            addressLocality: property.location.alcaldia,
                            addressRegion: 'CDMX',
                            addressCountry: 'MX',
                        },
                        numberOfRooms: property.bedrooms,
                        floorSize: {
                            '@type': 'QuantitativeValue',
                            value: property.area,
                            unitCode: 'MTK',
                        },
                        image: property.images,
                    }),
                }}
            />
        </div>
    );
}
