import { format, subMonths } from 'date-fns';

// Types
export interface ComparableProperty {
    id: string;
    address: string;
    type: 'departamento' | 'casa' | 'terreno';
    size: number; // m²
    bedrooms: number;
    bathrooms: number;
    price: number;
    pricePerM2: number;
    soldDate: string;
    daysOnMarket: number;
    location: string;
    condition: 'excellent' | 'good' | 'fair';
    adjustments: {
        location: number;
        size: number;
        condition: number;
        amenities: number;
        total: number;
    };
    adjustedPrice: number;
}

export interface CMAData {
    id: string;
    subjectProperty: {
        address: string;
        type: string;
        size: number;
        bedrooms: number;
        bathrooms: number;
        condition: string;
    };
    comparables: ComparableProperty[];
    valuationRange: {
        low: number;
        mid: number;
        high: number;
    };
    recommendedPrice: number;
    marketTrend: 'up' | 'stable' | 'down';
    createdAt: string;
}

export interface MarketData {
    area: string;
    period: string;
    metrics: {
        avgPricePerM2: number;
        totalSales: number;
        inventoryLevels: number;
        avgDaysOnMarket: number;
    };
    priceHistory: Array<{
        month: string;
        avgPrice: number;
    }>;
    typeDistribution: Array<{
        type: string;
        count: number;
        percentage: number;
    }>;
}

export interface SalesReportData {
    period: string;
    revenue: number;
    commission: number;
    sales: number;
    conversionRate: number;
    salesByAgent: Array<{
        name: string;
        sales: number;
        revenue: number;
    }>;
    salesByType: Array<{
        type: string;
        count: number;
        revenue: number;
    }>;
}

// Sample CMA Data
export const sampleCMAData: CMAData = {
    id: 'cma-001',
    subjectProperty: {
        address: 'Calle Insurgentes 450, Polanco',
        type: 'Departamento',
        size: 120,
        bedrooms: 2,
        bathrooms: 2,
        condition: 'Excelente',
    },
    comparables: [
        {
            id: 'comp-001',
            address: 'Av. Polanco 230',
            type: 'departamento',
            size: 125,
            bedrooms: 2,
            bathrooms: 2,
            price: 4500000,
            pricePerM2: 36000,
            soldDate: '2025-12-15',
            daysOnMarket: 42,
            location: 'Polanco',
            condition: 'excellent',
            adjustments: {
                location: 0,
                size: -50000,
                condition: 0,
                amenities: 100000,
                total: 50000,
            },
            adjustedPrice: 4550000,
        },
        {
            id: 'comp-002',
            address: 'Homero 145',
            type: 'departamento',
            size: 115,
            bedrooms: 2,
            bathrooms: 2,
            price: 4200000,
            pricePerM2: 36522,
            soldDate: '2026-01-05',
            daysOnMarket: 28,
            location: 'Polanco',
            condition: 'good',
            adjustments: {
                location: 0,
                size: 50000,
                condition: 100000,
                amenities: 0,
                total: 150000,
            },
            adjustedPrice: 4350000,
        },
        {
            id: 'comp-003',
            address: 'Masaryk 890',
            type: 'departamento',
            size: 120,
            bedrooms: 2,
            bathrooms: 2,
            price: 4800000,
            pricePerM2: 40000,
            soldDate: '2025-11-20',
            daysOnMarket: 35,
            location: 'Polanco',
            condition: 'excellent',
            adjustments: {
                location: 100000,
                size: 0,
                condition: 0,
                amenities: -50000,
                total: 50000,
            },
            adjustedPrice: 4850000,
        },
    ],
    valuationRange: {
        low: 4200000,
        mid: 4583000,
        high: 4900000,
    },
    recommendedPrice: 4600000,
    marketTrend: 'up',
    createdAt: format(new Date(), 'yyyy-MM-dd'),
};

// Market Data by Area
export const marketDataByArea: Record<string, MarketData> = {
    'benito-juarez': {
        area: 'Benito Juárez',
        period: 'Últimos 6 meses',
        metrics: {
            avgPricePerM2: 42500,
            totalSales: 342,
            inventoryLevels: 1250,
            avgDaysOnMarket: 38,
        },
        priceHistory: Array.from({ length: 6 }, (_, i) => ({
            month: format(subMonths(new Date(), 5 - i), 'MMM yyyy'),
            avgPrice: 42000 + i * 500 + Math.random() * 1000,
        })),
        typeDistribution: [
            { type: 'Departamento', count: 205, percentage: 59.9 },
            { type: 'Casa', count: 98, percentage: 28.7 },
            { type: 'Local', count: 39, percentage: 11.4 },
        ],
    },
    'miguel-hidalgo': {
        area: 'Miguel Hidalgo',
        period: 'Últimos 6 meses',
        metrics: {
            avgPricePerM2: 52000,
            totalSales: 289,
            inventoryLevels: 980,
            avgDaysOnMarket: 32,
        },
        priceHistory: Array.from({ length: 6 }, (_, i) => ({
            month: format(subMonths(new Date(), 5 - i), 'MMM yyyy'),
            avgPrice: 51000 + i * 700 + Math.random() * 1500,
        })),
        typeDistribution: [
            { type: 'Departamento', count: 178, percentage: 61.6 },
            { type: 'Casa', count: 85, percentage: 29.4 },
            { type: 'Local', count: 26, percentage: 9.0 },
        ],
    },
};

// Sales Report Data
export const sampleSalesReport: SalesReportData = {
    period: 'Q4 2025',
    revenue: 72400000,
    commission: 3620000,
    sales: 54,
    conversionRate: 12.4,
    salesByAgent: [
        { name: 'Ana García', sales: 12, revenue: 18500000 },
        { name: 'Carlos Ruiz', sales: 9, revenue: 14200000 },
        { name: 'María López', sales: 8, revenue: 12800000 },
        { name: 'Juan Pérez', sales: 6, revenue: 9400000 },
        { name: 'Sofía Torres', sales: 5, revenue: 7100000 },
        { name: 'Otros', sales: 14, revenue: 10400000 },
    ],
    salesByType: [
        { type: 'Departamento', count: 32, revenue: 42800000 },
        { type: 'Casa', count: 15, revenue: 21600000 },
        { type: 'Local', count: 5, revenue: 6200000 },
        { type: 'Terreno', count: 2, revenue: 1800000 },
    ],
};

// Helper functions
export function calculateAdjustedPrice(
    basePrice: number,
    adjustments: ComparableProperty['adjustments']
): number {
    return basePrice + adjustments.total;
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatNumber(num: number): string {
    return new Intl.NumberFormat('es-MX').format(num);
}

export function calculatePricePerM2(price: number, size: number): number {
    return Math.round(price / size);
}
