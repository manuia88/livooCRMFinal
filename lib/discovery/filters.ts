import type { Property } from '@/types';
import { categories, type Category } from './categories';

export function getPropertiesByCategory(
    slug: string,
    allProperties: Property[]
): Property[] {
    const category = categories.find((c) => c.slug === slug);
    if (!category) return [];

    return allProperties.filter(category.filterFunction);
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
): Category[] {
    // Simple logic: return random categories excluding current
    return categories
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
