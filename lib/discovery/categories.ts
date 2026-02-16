import {
    Dog,
    Waves,
    Dumbbell,
    Mountain,
    Home,
    TrendingUp,
    Briefcase,
    Trees,
    Palette,
    Building2,
    Shield,
    DollarSign,
    type LucideIcon,
} from 'lucide-react';
import type { Property } from '@/types';

export interface Category {
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string; // Tailwind color class
    gradient: string; // Gradient background
    filterFunction: (property: Property) => boolean;
}

export const categories: Category[] = [
    {
        slug: 'pet-friendly',
        title: 'Pet-Friendly',
        description: 'Propiedades que aceptan mascotas con facilidad',
        icon: Dog,
        color: 'text-amber-600',
        gradient: 'from-amber-500 to-orange-500',
        filterFunction: (prop) => prop.features.includes('Acepta mascotas'),
    },
    {
        slug: 'con-alberca',
        title: 'Con Alberca',
        description: 'Edificios con alberca para disfrutar todo el año',
        icon: Waves,
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-cyan-500',
        filterFunction: (prop) => prop.features.includes('Alberca'),
    },
    {
        slug: 'con-gimnasio',
        title: 'Con Gimnasio',
        description: 'Amenidades fitness para tu bienestar',
        icon: Dumbbell,
        color: 'text-red-600',
        gradient: 'from-red-500 to-pink-500',
        filterFunction: (prop) => prop.features.includes('Gimnasio'),
    },
    {
        slug: 'vista-panoramica',
        title: 'Vista Panorámica',
        description: 'Vistas espectaculares de la ciudad',
        icon: Mountain,
        color: 'text-purple-600',
        gradient: 'from-purple-500 to-indigo-500',
        filterFunction: (prop) =>
            prop.features.includes('Vista panorámica') ||
            (prop.floor !== undefined && prop.floor >= 10),
    },
    {
        slug: 'roof-garden',
        title: 'Roof Garden',
        description: 'Terrazas y azoteas privadas para relajarte',
        icon: Home,
        color: 'text-green-600',
        gradient: 'from-green-500 to-emerald-500',
        filterFunction: (prop) =>
            prop.features.includes('Roof garden') ||
            prop.features.includes('Terraza') ||
            prop.type === 'Penthouse',
    },
    {
        slug: 'walkability',
        title: 'Walkability Alto',
        description: 'Cerca de todo lo que necesitas',
        icon: TrendingUp,
        color: 'text-teal-600',
        gradient: 'from-teal-500 to-cyan-500',
        filterFunction: (prop) => {
            // Mock walkability based on popular neighborhoods
            const walkableZones = ['Roma Norte', 'Condesa', 'Polanco', 'Del Valle'];
            return walkableZones.some((zone) =>
                prop.address.neighborhood?.includes(zone)
            );
        },
    },
    {
        slug: 'home-office',
        title: 'Home Office Ready',
        description: 'Espacios perfectos para trabajar desde casa',
        icon: Briefcase,
        color: 'text-slate-600',
        gradient: 'from-slate-500 to-gray-500',
        filterFunction: (prop) =>
            prop.bedrooms >= 2 ||
            prop.features.includes('Estudio') ||
            prop.features.includes('Cuarto de servicio'),
    },
    {
        slug: 'cerca-parques',
        title: 'Cerca de Parques',
        description: 'Rodeado de naturaleza y áreas verdes',
        icon: Trees,
        color: 'text-lime-600',
        gradient: 'from-lime-500 to-green-500',
        filterFunction: (prop) => {
            // Mock: neighborhoods near parks
            const parkZones = ['Condesa', 'Polanco', 'Coyoacán', 'San Ángel'];
            return parkZones.some((zone) =>
                prop.address.neighborhood?.includes(zone)
            );
        },
    },
    {
        slug: 'diseno-moderno',
        title: 'Diseño Moderno',
        description: 'Arquitectura contemporánea y minimalista',
        icon: Palette,
        color: 'text-violet-600',
        gradient: 'from-violet-500 to-purple-500',
        filterFunction: (prop) => {
            const modernYear = prop.yearBuilt && prop.yearBuilt >= 2015;
            const modernKeywords = prop.description
                .toLowerCase()
                .match(/moderno|contemporáneo|minimalista/);
            return modernYear || !!modernKeywords;
        },
    },
    {
        slug: 'estilo-colonial',
        title: 'Estilo Colonial',
        description: 'Charm histórico y arquitectura clásica',
        icon: Building2,
        color: 'text-yellow-700',
        gradient: 'from-yellow-600 to-amber-600',
        filterFunction: (prop) => {
            const oldBuilding = prop.yearBuilt && prop.yearBuilt < 1970;
            const colonialKeywords = prop.description
                .toLowerCase()
                .match(/colonial|clásico|histórico/);
            return oldBuilding || !!colonialKeywords;
        },
    },
    {
        slug: 'ultra-seguridad',
        title: 'Ultra Seguridad',
        description: 'Máxima seguridad y tranquilidad',
        icon: Shield,
        color: 'text-red-700',
        gradient: 'from-red-600 to-rose-600',
        filterFunction: (prop) =>
            prop.features.includes('Seguridad 24/7') &&
            (prop.features.includes('CCTV') || prop.features.includes('Acceso controlado')),
    },
    {
        slug: 'mejor-precio',
        title: 'Mejor Precio/m²',
        description: 'Las mejores oportunidades del mercado',
        icon: DollarSign,
        color: 'text-emerald-600',
        gradient: 'from-emerald-500 to-green-500',
        filterFunction: (prop) => {
            // This will be calculated dynamically based on price/m² ratio
            const pricePerSqm = prop.price / prop.area;
            return pricePerSqm < 80000; // Mock threshold
        },
    },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((c) => c.slug === slug);
}
