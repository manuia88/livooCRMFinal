// Category data types - serializable only
export interface CategoryData {
    slug: string;
    title: string;
    description: string;
    iconName: string; // String reference to Lucide icon
    color: string; // Tailwind color class
    gradient: string; // Gradient background
}

// Category definitions - plain data only (serializable)
export const categoriesData: CategoryData[] = [
    {
        slug: 'pet-friendly',
        title: 'Pet-Friendly',
        description: 'Propiedades que aceptan mascotas con facilidad',
        iconName: 'Dog',
        color: 'text-amber-600',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        slug: 'con-alberca',
        title: 'Con Alberca',
        description: 'Edificios con alberca para disfrutar todo el año',
        iconName: 'Waves',
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        slug: 'con-gimnasio',
        title: 'Con Gimnasio',
        description: 'Amenidades fitness para tu bienestar',
        iconName: 'Dumbbell',
        color: 'text-red-600',
        gradient: 'from-red-500 to-pink-500',
    },
    {
        slug: 'vista-panoramica',
        title: 'Vista Panorámica',
        description: 'Vistas espectaculares de la ciudad',
        iconName: 'Mountain',
        color: 'text-purple-600',
        gradient: 'from-purple-500 to-indigo-500',
    },
    {
        slug: 'roof-garden',
        title: 'Roof Garden',
        description: 'Terrazas y azoteas privadas para relajarte',
        iconName: 'Home',
        color: 'text-green-600',
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        slug: 'walkability',
        title: 'Walkability Alto',
        description: 'Cerca de todo lo que necesitas',
        iconName: 'TrendingUp',
        color: 'text-teal-600',
        gradient: 'from-teal-500 to-cyan-500',
    },
    {
        slug: 'home-office',
        title: 'Home Office Ready',
        description: 'Espacios perfectos para trabajar desde casa',
        iconName: 'Briefcase',
        color: 'text-slate-600',
        gradient: 'from-slate-500 to-gray-500',
    },
    {
        slug: 'cerca-parques',
        title: 'Cerca de Parques',
        description: 'Rodeado de naturaleza y áreas verdes',
        iconName: 'Trees',
        color: 'text-lime-600',
        gradient: 'from-lime-500 to-green-500',
    },
    {
        slug: 'diseno-moderno',
        title: 'Diseño Moderno',
        description: 'Arquitectura contemporánea y minimalista',
        iconName: 'Palette',
        color: 'text-violet-600',
        gradient: 'from-violet-500 to-purple-500',
    },
    {
        slug: 'estilo-colonial',
        title: 'Estilo Colonial',
        description: 'Charm histórico y arquitectura clásica',
        iconName: 'Building2',
        color: 'text-yellow-700',
        gradient: 'from-yellow-600 to-amber-600',
    },
    {
        slug: 'ultra-seguridad',
        title: 'Ultra Seguridad',
        description: 'Máxima seguridad y tranquilidad',
        iconName: 'Shield',
        color: 'text-red-700',
        gradient: 'from-red-600 to-rose-600',
    },
    {
        slug: 'mejor-precio',
        title: 'Mejor Precio/m²',
        description: 'Las mejores oportunidades del mercado',
        iconName: 'DollarSign',
        color: 'text-emerald-600',
        gradient: 'from-emerald-500 to-green-500',
    },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
    return categoriesData.find((c) => c.slug === slug);
}
