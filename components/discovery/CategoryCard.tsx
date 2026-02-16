import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/lib/discovery/categories';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
    category: Category;
    propertyCount: number;
    size?: 'small' | 'medium' | 'large';
}

export default function CategoryCard({
    category,
    propertyCount,
    size = 'medium',
}: CategoryCardProps) {
    const Icon = category.icon;

    const sizeClasses = {
        small: 'h-48',
        medium: 'h-64',
        large: 'h-96',
    };

    return (
        <Link href={`/descubrir/${category.slug}`}>
            <Card
                className={cn(
                    'relative overflow-hidden group cursor-pointer transition-all hover:scale-105 hover:shadow-xl',
                    sizeClasses[size]
                )}
            >
                {/* Gradient Background */}
                <div
                    className={cn(
                        'absolute inset-0 bg-gradient-to-br',
                        category.gradient,
                        'opacity-90 group-hover:opacity-100 transition-opacity'
                    )}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6 text-white">
                    {/* Icon */}
                    <div className="flex justify-between items-start">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                            <Icon className="h-8 w-8" />
                        </div>
                        <Badge className="bg-white/90 text-gray-900">
                            {propertyCount} {propertyCount === 1 ? 'propiedad' : 'propiedades'}
                        </Badge>
                    </div>

                    {/* Title & Description */}
                    <div>
                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                        <p className="text-sm text-white/90 line-clamp-2">
                            {category.description}
                        </p>
                    </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
            </Card>
        </Link>
    );
}
