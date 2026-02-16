import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UnitMatrix } from '@/components/desarrollo/UnitMatrix';
import { AmenitiesGrid } from '@/components/desarrollo/AmenitiesGrid';
import { ConstructionProgress } from '@/components/desarrollo/ConstructionProgress';
import { LeadCaptureForm } from '@/components/desarrollo/LeadCaptureForm';
import { mockDesarrollos } from '@/lib/mock-data/desarrollos';
import { Building2, MapPin, Calendar, TrendingUp, Check } from 'lucide-react';

interface DesarrolloPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: DesarrolloPageProps): Promise<Metadata> {
    const { slug } = await params;
    const desarrollo = mockDesarrollos.find((d) => d.slug === slug);

    if (!desarrollo) {
        return { title: 'Desarrollo no encontrado' };
    }

    return {
        title: `${desarrollo.name} - ${desarrollo.address.neighborhood} | Livoo`,
        description: `${desarrollo.description}. Desde ${(desarrollo.priceFrom / 1000000).toFixed(1)}M. ${desarrollo.availableUnits} unidades disponibles. Entrega ${desarrollo.deliveryDate}.`,
    };
}

export default async function DesarrolloPage({ params }: DesarrolloPageProps) {
    const { slug } = await params;
    const desarrollo = mockDesarrollos.find((d) => d.slug === slug);

    if (!desarrollo) {
        notFound();
    }

    const formatPrice = (price: number) => `$${(price / 1000000).toFixed(1)}M`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Gallery */}
            <section className="relative h-[400px] md:h-[500px] bg-gray-900">
                <Image
                    src={desarrollo.coverImage}
                    alt={desarrollo.name}
                    fill
                    className="object-cover opacity-90"
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-12">
                        <div className="max-w-4xl">
                            {/* Status Badge */}
                            <div className="mb-4">
                                {desarrollo.status === 'presale' && <Badge variant="success" className="text-sm px-3 py-1">Preventa</Badge>}
                                {desarrollo.status === 'construction' && <Badge variant="default" className="text-sm px-3 py-1">En Construcción</Badge>}
                                {desarrollo.status === 'ready' && <Badge variant="loft" className="text-sm px-3 py-1">Listo para Entrega</Badge>}
                            </div>

                            {/* Developer */}
                            <p className="text-white/80 mb-2">{desarrollo.developer}</p>

                            {/* Name */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                                {desarrollo.name}
                            </h1>

                            {/* Tagline */}
                            <p className="text-xl text-white/90 mb-6">{desarrollo.tagline}</p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 text-white">
                                <div>
                                    <div className="text-sm opacity-75 mb-1">Desde</div>
                                    <div className="text-2xl font-bold">{formatPrice(desarrollo.priceFrom)}</div>
                                </div>
                                <div>
                                    <div className="text-sm opacity-75 mb-1">Disponibles</div>
                                    <div className="text-2xl font-bold">
                                        {desarrollo.availableUnits} de {desarrollo.totalUnits}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm opacity-75 mb-1">Entrega</div>
                                    <div className="text-2xl font-bold">{desarrollo.deliveryDate}</div>
                                </div>
                                <div>
                                    <div className="text-sm opacity-75 mb-1">Avance</div>
                                    <div className="text-2xl font-bold">{desarrollo.constructionProgress}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Descripción del Proyecto</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {desarrollo.description}
                            </p>

                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[var(--loft-orange)] mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900">{desarrollo.address.street}</p>
                                    <p className="text-gray-600">
                                        {desarrollo.address.neighborhood}, {desarrollo.address.city}, {desarrollo.address.state}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Features */}
                        {desarrollo.features.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Características</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {desarrollo.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Unit Matrix */}
                        <section>
                            <UnitMatrix floorPlans={desarrollo.floorPlans} />
                        </section>

                        {/* Amenities */}
                        <section>
                            <AmenitiesGrid amenities={desarrollo.amenities} />
                        </section>

                        {/* Construction Progress */}
                        <section>
                            <ConstructionProgress
                                progress={desarrollo.constructionProgress}
                                milestones={desarrollo.milestones}
                                deliveryDate={desarrollo.deliveryDate}
                            />
                        </section>

                        {/* Gallery */}
                        {desarrollo.gallery.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Galería</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {desarrollo.gallery.slice(1).map((image, index) => (
                                        <div key={index} className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={image}
                                                alt={`${desarrollo.name} - Imagen ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar - Lead Capture */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <LeadCaptureForm
                                desarrolloId={desarrollo.id}
                                desarrolloName={desarrollo.name}
                                floorPlans={desarrollo.floorPlans}
                                salesPhone={desarrollo.salesOffice.phone}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sales Office */}
            <section className="bg-white border-t py-12">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Oficina de Ventas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Dirección</p>
                                <p className="font-medium text-gray-900">{desarrollo.salesOffice.address}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Horario</p>
                                <p className="font-medium text-gray-900">{desarrollo.salesOffice.hours}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                                <a
                                    href={`tel:${desarrollo.salesOffice.phone}`}
                                    className="font-medium text-[var(--loft-orange)] hover:underline"
                                >
                                    {desarrollo.salesOffice.phone}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                <a
                                    href={`mailto:${desarrollo.salesOffice.email}`}
                                    className="font-medium text-[var(--loft-orange)] hover:underline"
                                >
                                    {desarrollo.salesOffice.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
