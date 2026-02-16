'use client';

import { useState, useMemo } from 'react';
import PropertyMap from '@/components/search/PropertyMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    MapPin,
    Grid3x3,
    List,
    SlidersHorizontal,
    Search,
    BedDouble,
    Bath,
    Car,
    Home,
    X,
} from 'lucide-react';
import { mockProperties } from '@/lib/mock-data/properties';
import type { Property } from '@/types';

type ViewMode = 'grid' | 'list';
type SortOption = 'price-asc' | 'price-desc' | 'area-desc' | 'recent';

export default function BuscarPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('recent');
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>();
    const [showFilters, setShowFilters] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTipo, setSelectedTipo] = useState<string>('all');
    const [selectedAlcaldia, setSelectedAlcaldia] = useState<string>('all');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');

    // Filter properties
    const filteredProperties = useMemo(() => {
        let filtered = [...mockProperties];

        // Search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.address.neighborhood.toLowerCase().includes(query) ||
                    p.address.city.toLowerCase().includes(query)
            );
        }

        // Type filter
        if (selectedTipo !== 'all') {
            filtered = filtered.filter((p) => p.type === selectedTipo);
        }

        // Alcaldía filter
        if (selectedAlcaldia !== 'all') {
            filtered = filtered.filter((p) => p.address.state === selectedAlcaldia);
        }

        // Price range
        if (minPrice) {
            filtered = filtered.filter((p) => p.price >= Number(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter((p) => p.price <= Number(maxPrice));
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'area-desc':
                filtered.sort((a, b) => b.area - a.area);
                break;
            case 'recent':
                filtered.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
        }

        return filtered;
    }, [searchQuery, selectedTipo, selectedAlcaldia, minPrice, maxPrice, sortBy]);

    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(2)}M`;
        }
        return `$${price.toLocaleString('es-MX')}`;
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedTipo('all');
        setSelectedAlcaldia('all');
        setMinPrice('');
        setMaxPrice('');
    };

    const hasActiveFilters =
        searchQuery ||
        selectedTipo !== 'all' ||
        selectedAlcaldia !== 'all' ||
        minPrice ||
        maxPrice;

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                            Búsqueda de Propiedades
                        </h1>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {filteredProperties.length}{' '}
                            {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Sort */}
                        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Más Recientes</SelectItem>
                                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                                <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                                <SelectItem value="area-desc">Mayor Área</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* View Toggle */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                            <Button
                                size="sm"
                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3x3 className="h-4 w-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant={viewMode === 'list' ? 'default' : 'ghost'}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Filters Toggle */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filtros
                            {hasActiveFilters && (
                                <Badge className="ml-2" variant="default">
                                    •
                                </Badge>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Filters Bar */}
                {showFilters && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4 pb-4">
                        <div>
                            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">
                                Buscar
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Colonia, ciudad..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">
                                Tipo
                            </label>
                            <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="casa">Casa</SelectItem>
                                    <SelectItem value="departamento">Departamento</SelectItem>
                                    <SelectItem value="oficina">Oficina</SelectItem>
                                    <SelectItem value="terreno">Terreno</SelectItem>
                                    <SelectItem value="local">Local</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">
                                Alcaldía/Estado
                            </label>
                            <Select value={selectedAlcaldia} onValueChange={setSelectedAlcaldia}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    <SelectItem value="CDMX">CDMX</SelectItem>
                                    <SelectItem value="Jalisco">Jalisco</SelectItem>
                                    <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">
                                Precio Mín
                            </label>
                            <Input
                                type="number"
                                placeholder="$0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>

                        <div className="flex items-end gap-2">
                            <div className="flex-1">
                                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">
                                    Precio Máx
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Sin límite"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                            {hasActiveFilters && (
                                <Button variant="ghost" size="sm" onClick={clearFilters}>
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content: 50/50 Split */}
            <div className="flex flex-1 overflow-hidden">
                {/* Map (Left 50%) */}
                <div className="hidden md:block w-1/2 relative">
                    <PropertyMap
                        properties={filteredProperties}
                        selectedPropertyId={selectedPropertyId}
                        onPropertyClick={setSelectedPropertyId}
                    />
                </div>

                {/* Listings (Right 50%) */}
                <div className="w-full md:w-1/2 overflow-y-auto bg-[var(--bg-page)] p-6">
                    {filteredProperties.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <Home className="h-16 w-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                                No se encontraron propiedades
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] mb-4">
                                Intenta ajustar los filtros de búsqueda
                            </p>
                            {hasActiveFilters && (
                                <Button variant="outline" onClick={clearFilters}>
                                    Limpiar Filtros
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 lg:grid-cols-2 gap-4'
                                    : 'space-y-4'
                            }
                        >
                            {filteredProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    viewMode={viewMode}
                                    isSelected={property.id === selectedPropertyId}
                                    onMouseEnter={() => setSelectedPropertyId(property.id)}
                                    onClick={() => setSelectedPropertyId(property.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Property Card Component
function PropertyCard({
    property,
    viewMode,
    isSelected,
    onMouseEnter,
    onClick,
}: {
    property: Property;
    viewMode: ViewMode;
    isSelected: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
}) {
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(2)}M MXN`;
        }
        return `$${price.toLocaleString('es-MX')} MXN`;
    };

    return (
        <Card
            className={`overflow-hidden cursor-pointer transition-all duration-200 ${isSelected
                    ? 'ring-2 ring-[var(--primary)] shadow-lg'
                    : 'hover:shadow-md'
                }`}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
            <div className={viewMode === 'list' ? 'flex' : ''}>
                {/* Image */}
                <div
                    className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-48 w-full'
                        }`}
                >
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    <Badge
                        className="absolute top-2 left-2 capitalize"
                        variant={property.status === 'disponible' ? 'default' : 'secondary'}
                    >
                        {property.status}
                    </Badge>
                    <Badge className="absolute top-2 right-2 capitalize" variant="outline">
                        {property.type}
                    </Badge>
                </div>

                {/* Details */}
                <div className="p-4 flex-1">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-2">
                        {property.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-2 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.address.neighborhood}, {property.address.state}
                    </p>
                    <p className="text-xl font-bold text-[var(--primary)] mb-3">
                        {formatPrice(property.price)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                        {property.area > 0 && <span>{property.area}m²</span>}
                        {property.bedrooms > 0 && (
                            <span className="flex items-center gap-1">
                                <BedDouble className="h-4 w-4" />
                                {property.bedrooms}
                            </span>
                        )}
                        {property.bathrooms > 0 && (
                            <span className="flex items-center gap-1">
                                <Bath className="h-4 w-4" />
                                {property.bathrooms}
                            </span>
                        )}
                        {property.parking > 0 && (
                            <span className="flex items-center gap-1">
                                <Car className="h-4 w-4" />
                                {property.parking}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
