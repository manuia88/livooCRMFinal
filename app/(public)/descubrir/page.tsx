import type { Metadata } from 'next';
import CategoryHero from '@/components/discovery/CategoryHero';
import CategoryPills from '@/components/discovery/CategoryPills';
import PropertyMosaic from '@/components/discovery/PropertyMosaic';
import CategoryCard from '@/components/discovery/CategoryCard';
import { categories } from '@/lib/discovery/categories';
import { getCategoryPropertyCount } from '@/lib/discovery/filters';
import { mockProperties } from '@/lib/mock-data/properties';

export const metadata: Metadata = {
    title: 'Descubre Propiedades por Estilo de Vida | Livoo',
    description:
        'Encuentra tu hogar ideal navegando por categorías curadas: Pet-Friendly, Con Alberca, Vista Panorámica, Roof Garden y más. Busca por estilo de vida, no solo por metros cuadrados.',
    openGraph: {
        title: 'Descubre tu Hogar Ideal | Livoo',
        description:
            'Explora propiedades por estilo de vida: Pet-Friendly, Con Alberca, Vista Panorámica y más.',
        type: 'website',
    },
};

export default function DescubrirPage() {
    const getCategoryCount = (slug: string) =>
        getCategoryPropertyCount(slug, mockProperties);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <CategoryHero />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Pills - Temporarily disabled due to serialization */}
                //                 <div className="mb-12">
                //                     <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                //                         Explora por Categoría
                //                     </h2>
                //                     <CategoryPills categories={categories} />
                //                 </div>

                {/* Featured Mosaic - Temporarily disabled due to serialization */}
                //                 <div className="mb-16">
                //                     <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                //                         Categorías Destacadas
                //                     </h2>
                //                     <PropertyMosaic
                //                         categories={categories}
                //                         allProperties={mockProperties}
                //                         getCategoryCount={getCategoryCount}
                //                     />
                </div>

                {/* All Categories Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                        Todas las Categorías
                    </h2>
                        {/* Category grid - Temporarily disabled due to serialization */}
                        //                         {categories.map((category) => (
                        //                             <CategoryCard
                        //                                 key={category.slug}
                        //                                 category={category}
                        //                                 propertyCount={getCategoryCount(category.slug)}
                        //                                 size="medium"
                        //                             />
                        //                         ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center bg-white rounded-lg shadow-sm p-12">
                    <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                        ¿No encuentras lo que buscas?
                    </h3>
                    <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
                        Nuestros asesores expertos pueden ayudarte a encontrar la propiedad
                        perfecta que se ajuste a tus necesidades y estilo de vida.
                    </p>
                    <a
                        href="https://wa.me/5512345678?text=Hola,%20necesito%20ayuda%20para%20encontrar%20una%20propiedad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Contactar un Asesor
                    </a>
                </div>
            </div>
        </div>
    );
}
