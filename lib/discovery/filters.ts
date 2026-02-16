import type { Property } from '@/types';
import { categoriesData, type CategoryData } from './categories';

// Filter functions - server-side only
export function getPropertiesByCategory(
    slug: string,
    allProperties: Property[]
): Property[] {
    const categoryFilters: Record<string, (prop: Property) => boolean> = {
        'pet-friendly': (prop) => prop.features.includes('Acepta mascotas'),
        'con-alberca': (prop) => prop.features.includes('Alberca'),
        'con-gimnasio': (prop) => prop.features.includes('Gimnasio'),
        'vista-panoramica': (prop) =>
            prop.features.includes('Vista panorámica') ||
            (prop.floor !== undefined && prop.floor >= 10),
        'roof-garden': (prop) =>
            prop.features.includes('Roof garden') ||
            prop.features.includes('Terraza') ||
            prop.type === 'Penthouse',
        'walkability': (prop) => {
            const walkableZones = ['Roma Norte', 'Condesa', 'Polanco', 'Del Valle'];
            return walkableZones.some((zone) =>
                prop.address.neighborhood?.includes(zone)
            );
        },
        'home-office': (prop) =>
            prop.bedrooms >= 2 ||
            prop.features.includes('Estudio') ||
            prop.features.includes('Cuarto de servicio'),
        'cerca-parques': (prop) => {
            const parkZones = ['Condesa', 'Polanco', 'Coyoacán', 'San Ángel'];
            return parkZones.some((zone) =>
                prop.address.neighborhood?.includes(zone)
            );
        },
        'diseno-moderno': (prop) => {
            const modernYear = prop.yearBuilt && prop.yearBuilt >= 2015;
            const modernKeywords = prop.description
                .toLowerCase()
                .match(/moderno|contemporáneo|minimalista/);
            return modernYear || !!modernKeywords;
        },
        'estilo-colonial': (prop) => {
            const oldBuilding = prop.yearBuilt && prop.yearBuilt < 1970;
            const colonialKeywords = prop.description
                .toLowerCase()
                .match(/colonial|clásico|histórico/);
            return oldBuilding || !!colonialKeywords;
        },
        'ultra-seguridad': (prop) =>
            prop.features.includes('Seguridad 24/7') &&
            (prop.features.includes('CCTV') ||
                prop.features.includes('Acceso controlado')),
        'mejor-precio': (prop) => {
            const pricePerSqm = prop.price / prop.area;
            return pricePerSqm < 80000;
        },
    };

    const filterFn = categoryFilters[slug];
    if (!filterFn) return [];

    return allProperties.filter(filterFn);
}

export function getCategoryStats(slug: string, allProperties: Property[]) {
    const properties = getPropertiesByCategory(slug, allProperties);

    if (properties.length === 0) {
        return {
            count: 0,
            avgPrice: 0,
            minPrice: 0,
            maxPrice: 0,
            avgArea: 0,
        };
    }

    const prices = properties.map((p) => p.price);
    const areas = properties.map((p) => p.area);

    return {
        count: properties.length,
        avgPrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
        avgArea: Math.round(areas.reduce((a, b) => a + b, 0) / areas.length),
    };
}

export function getRelatedCategories(
    currentSlug: string,
    limit: number = 3
): CategoryData[] {
    return categoriesData
        .filter((c) => c.slug !== currentSlug)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
}

export function getCategoryPropertyCount(
    slug: string,
    allProperties: Property[]
): number {
    return getPropertiesByCategory(slug, allProperties).length;
}
