import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DesarrolloCard } from '@/components/desarrollo/DesarrolloCard';
import { mockDesarrollos } from '@/lib/mock-data/desarrollos';
import { Building2, Search } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Desarrollos en Preventa - Nuevos Proyectos Inmobiliarios | Livoo',
    description: 'Descubre los mejores desarrollos inmobiliarios en preventa en CDMX y Edomex. Departamentos, residencias y condominios con los mejores precios de lanzamiento.',
};

export default function DesarrollosPage() {
    // Sort by construction progress (most advanced first)
    const sortedDesarrollos = [...mockDesarrollos].sort((a, b) =>
        b.constructionProgress - a.constructionProgress
    );

    const featuredDesarrollos = sortedDesarrollos.slice(0, 3);
    const allDesarrollos = sortedDesarrollos;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[var(--loft-orange)] via-[var(--loft-gradient-start)] to-[var(--loft-red-dark)] text-white">
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative container mx-auto px-6 py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Building2 className="h-5 w-5" />
                            <span className="text-sm font-medium">Preventas Exclusivas</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Descubre tu hogar en <br />
                            nuevos desarrollos
                        </h1>

                        <p className="text-xl text-white/90 mb-8">
                            Invierte en preventas con los mejores precios y planes de pago
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white rounded-lg p-4 shadow-2xl">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            placeholder="Buscar por zona, nombre o desarrollador..."
                                            className="pl-10 h-12 text-gray-900"
                                        />
                                    </div>
                                </div>

                                <Select>
                                    <SelectTrigger className="w-full md:w-48 h-12 text-gray-900">
                                        <SelectValue placeholder="Precio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos los precios</SelectItem>
                                        <SelectItem value="0-5">Hasta $5M</SelectItem>
                                        <SelectItem value="5-10">$5M - $10M</SelectItem>
                                        <SelectItem value="10+">Más de $10M</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger className="w-full md:w-48 h-12 text-gray-900">
                                        <SelectValue placeholder="Entrega" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas las fechas</SelectItem>
                                        <SelectItem value="2026">2026</SelectItem>
                                        <SelectItem value="2027">2027</SelectItem>
                                        <SelectItem value="2028">2028+</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    size="lg"
                                    className="bg-[var(--loft-orange)] hover:bg-[var(--loft-orange-hover)] h-12 px-8 whitespace-nowrap"
                                >
                                    Buscar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave SVG Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                    >
                        <path
                            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                            fill="#F9FAFB"
                        />
                    </svg>
                </div>
            </section>

            {/* Featured Desarrollos */}
            <section className="container mx-auto px-6 -mt-16 relative z-10 mb-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Desarrollos Destacados
                    </h2>
                    <p className="text-gray-600">
                        Los proyectos más avanzados y con mayor demanda
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredDesarrollos.map((desarrollo) => (
                        <DesarrolloCard
                            key={desarrollo.id}
                            desarrollo={desarrollo}
                            size="large"
                        />
                    ))}
                </div>
            </section>

            {/* All Desarrollos */}
            <section className="container mx-auto px-6 py-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Todos los Desarrollos
                    </h2>
                    <p className="text-gray-600">
                        {allDesarrollos.length} proyectos disponibles
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allDesarrollos.map((desarrollo) => (
                        <DesarrolloCard
                            key={desarrollo.id}
                            desarrollo={desarrollo}
                            size="medium"
                        />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[var(--loft-orange)] to-[var(--loft-red-dark)] text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        ¿Buscas un desarrollo a tu medida?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Nuestros asesores te ayudarán a encontrar el proyecto perfecto según tu presupuesto y necesidades
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white text-[var(--loft-orange)] hover:bg-white/90 border-0"
                        >
                            Agendar Asesoría
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white/10"
                        >
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
