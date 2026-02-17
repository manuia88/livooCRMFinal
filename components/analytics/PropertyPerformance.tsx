'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    propertyPerformance,
    formatCurrency,
    formatNumber,
    type PropertyPerformance as PropertyType,
} from '@/lib/data/analyticsData';
import { Flame, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react';

type SortKey = 'views' | 'leads' | 'visits' | 'offers' | 'daysOnMarket';
type SortDirection = 'asc' | 'desc';

export default function PropertyPerformance() {
    const [sortKey, setSortKey] = useState<SortKey>('views');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [filter, setFilter] = useState<string>('all');

    // Filter properties
    let filteredProperties = propertyPerformance;
    if (filter !== 'all') {
        filteredProperties = propertyPerformance.filter((p) => p.type === filter);
    }

    // Sort properties
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        return multiplier * (a[sortKey] - b[sortKey]);
    });

    // Calculate conversion rate
    const getConversionRate = (property: PropertyType) => {
        return property.views > 0 ? (property.leads / property.views) * 100 : 0;
    };

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('desc');
        }
    };

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortKey !== column) return null;
        return sortDirection === 'asc' ? (
            <ChevronUp className="h-4 w-4" />
        ) : (
            <ChevronDown className="h-4 w-4" />
        );
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Desempeño de Propiedades
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Top 10 propiedades por actividad
                    </p>
                </div>

                {/* Filter */}
                <div className="flex gap-2">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </Button>
                    <Button
                        variant={filter === 'departamento' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('departamento')}
                    >
                        Deptos
                    </Button>
                    <Button
                        variant={filter === 'casa' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('casa')}
                    >
                        Casas
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                                Propiedad
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                                Precio
                            </th>
                            <th
                                className="text-right py-3 px-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('views')}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Vistas
                                    <SortIcon column="views" />
                                </div>
                            </th>
                            <th
                                className="text-right py-3 px-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('leads')}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Leads
                                    <SortIcon column="leads" />
                                </div>
                            </th>
                            <th
                                className="text-right py-3 px-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('visits')}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Visitas
                                    <SortIcon column="visits" />
                                </div>
                            </th>
                            <th
                                className="text-right py-3 px-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('offers')}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Ofertas
                                    <SortIcon column="offers" />
                                </div>
                            </th>
                            <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">
                                Conv. %
                            </th>
                            <th
                                className="text-right py-3 px-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('daysOnMarket')}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Días
                                    <SortIcon column="daysOnMarket" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProperties.slice(0, 10).map((property) => (
                            <tr
                                key={property.id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="py-3 px-2">
                                    <div className="flex items-center gap-2">
                                        {property.status === 'hot' && (
                                            <Flame className="h-4 w-4 text-orange-500" />
                                        )}
                                        {property.status === 'cold' && (
                                            <AlertTriangle className="h-4 w-4 text-gray-400" />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {property.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {property.location}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-700">
                                    {formatCurrency(property.price)}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-700 text-right">
                                    {formatNumber(property.views)}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-700 text-right">
                                    {formatNumber(property.leads)}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-700 text-right">
                                    {formatNumber(property.visits)}
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-700 text-right">
                                    {formatNumber(property.offers)}
                                </td>
                                <td className="py-3 px-2 text-sm font-medium text-right">
                                    <span
                                        className={
                                            getConversionRate(property) > 8
                                                ? 'text-green-600'
                                                : getConversionRate(property) > 5
                                                    ? 'text-amber-600'
                                                    : 'text-red-600'
                                        }
                                    >
                                        {getConversionRate(property).toFixed(1)}%
                                    </span>
                                </td>
                                <td className="py-3 px-2 text-sm text-gray-700 text-right">
                                    {property.daysOnMarket}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
