import CategoryCard from './CategoryCard';
import type { Property } from '@/types';
import type { Category } from '@/lib/discovery/categories';

interface PropertyMosaicProps {
    categories: Category[];
    allProperties: Property[];
    getCategoryCount: (slug: string) => number;
}

export default function PropertyMosaic({
    categories,
    allProperties,
    getCategoryCount,
}: PropertyMosaicProps) {
    // Select 3 featured categories (first 3 with most properties)
    const featured = [...categories]
        .sort((a, b) => getCategoryCount(b.slug) - getCategoryCount(a.slug))
        .slice(0, 3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Featured Card */}
            <div className="md:row-span-2">
                {featured[0] && (
                    <CategoryCard
                        category={featured[0]}
                        propertyCount={getCategoryCount(featured[0].slug)}
                        size="large"
                    />
                )}
            </div>

            {/* Two Medium Cards */}
            <div className="space-y-6">
                {featured[1] && (
                    <CategoryCard
                        category={featured[1]}
                        propertyCount={getCategoryCount(featured[1].slug)}
                        size="medium"
                    />
                )}
                {featured[2] && (
                    <CategoryCard
                        category={featured[2]}
                        propertyCount={getCategoryCount(featured[2].slug)}
                        size="medium"
                    />
                )}
            </div>
        </div>
    );
}
