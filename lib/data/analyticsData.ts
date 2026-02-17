import { addMonths, subMonths, format } from 'date-fns';

// Types
export interface PeriodMetrics {
    leads: number;
    properties: number;
    sales: number;
    revenue: number;
    commission: number;
    avgDaysToClose: number;
}

export interface ConversionStage {
    stage: string;
    count: number;
    conversionRate: number;
    dropOffRate: number;
}

export interface PropertyPerformance {
    id: string;
    name: string;
    type: 'departamento' | 'casa' | 'terreno' | 'local';
    price: number;
    views: number;
    leads: number;
    visits: number;
    offers: number;
    status: 'hot' | 'normal' | 'cold';
    daysOnMarket: number;
    location: string;
}

export interface AgentPerformance {
    id: string;
    name: string;
    avatar: string;
    sales: number;
    revenue: number;
    commission: number;
    leads: number;
    conversionRate: number;
    avgDaysToClose: number;
    pipelineValue: number;
}

export interface RevenueByType {
    type: string;
    amount: number;
    percentage: number;
    fill: string;
}

export interface RevenueBySource {
    source: string;
    amount: number;
}

export interface MonthlyData {
    month: string;
    leads: number;
    sales: number;
    revenue: number;
    commission: number;
}

// Current Period (Last 30 days)
export const currentMetrics: PeriodMetrics = {
    leads: 147,
    properties: 89,
    sales: 18,
    revenue: 2400000,
    commission: 125000,
    avgDaysToClose: 45,
};

// Previous Period (30-60 days ago)
export const previousMetrics: PeriodMetrics = {
    leads: 131,
    properties: 85,
    sales: 19,
    revenue: 2480000,
    commission: 115000,
    avgDaysToClose: 52,
};

// Conversion Funnel Data
export const conversionFunnel: ConversionStage[] = [
    { stage: 'Leads', count: 450, conversionRate: 100, dropOffRate: 0 },
    { stage: 'Contactados', count: 320, conversionRate: 71.1, dropOffRate: 28.9 },
    { stage: 'Calificados', count: 180, conversionRate: 56.3, dropOffRate: 43.8 },
    { stage: 'Visitas', count: 95, conversionRate: 52.8, dropOffRate: 47.2 },
    { stage: 'Propuestas', count: 42, conversionRate: 44.2, dropOffRate: 55.8 },
    { stage: 'Cierres', count: 18, conversionRate: 42.9, dropOffRate: 57.1 },
];

// Property Performance Data (Top 50)
export const propertyPerformance: PropertyPerformance[] = [
    {
        id: 'prop-001',
        name: 'Departamento Polanco 120m²',
        type: 'departamento',
        price: 4200000,
        views: 342,
        leads: 28,
        visits: 12,
        offers: 3,
        status: 'hot',
        daysOnMarket: 15,
        location: 'Polanco',
    },
    {
        id: 'prop-002',
        name: 'Casa Roma Norte 180m²',
        type: 'casa',
        price: 8500000,
        views: 287,
        leads: 24,
        visits: 10,
        offers: 2,
        status: 'hot',
        daysOnMarket: 22,
        location: 'Roma Norte',
    },
    {
        id: 'prop-003',
        name: 'Penthouse Condesa 165m²',
        type: 'departamento',
        price: 6800000,
        views: 412,
        leads: 31,
        visits: 14,
        offers: 4,
        status: 'hot',
        daysOnMarket: 18,
        location: 'Condesa',
    },
    {
        id: 'prop-004',
        name: 'Departamento Del Valle 95m²',
        type: 'departamento',
        price: 3200000,
        views: 198,
        leads: 15,
        visits: 7,
        offers: 1,
        status: 'normal',
        daysOnMarket: 35,
        location: 'Del Valle',
    },
    {
        id: 'prop-005',
        name: 'Casa Coyoacán 220m²',
        type: 'casa',
        price: 9200000,
        views: 156,
        leads: 12,
        visits: 5,
        offers: 1,
        status: 'normal',
        daysOnMarket: 42,
        location: 'Coyoacán',
    },
    {
        id: 'prop-006',
        name: 'Loft Centro Histórico 75m²',
        type: 'departamento',
        price: 2800000,
        views: 234,
        leads: 18,
        visits: 9,
        offers: 2,
        status: 'hot',
        daysOnMarket: 28,
        location: 'Centro',
    },
    {
        id: 'prop-007',
        name: 'Terreno Pedregal 500m²',
        type: 'terreno',
        price: 12000000,
        views: 89,
        leads: 6,
        visits: 2,
        offers: 0,
        status: 'cold',
        daysOnMarket: 78,
        location: 'Pedregal',
    },
    {
        id: 'prop-008',
        name: 'Departamento Nápoles 110m²',
        type: 'departamento',
        price: 3800000,
        views: 276,
        leads: 22,
        visits: 11,
        offers: 3,
        status: 'hot',
        daysOnMarket: 19,
        location: 'Nápoles',
    },
    {
        id: 'prop-009',
        name: 'Casa San Ángel 190m²',
        type: 'casa',
        price: 10500000,
        views: 132,
        leads: 10,
        visits: 4,
        offers: 1,
        status: 'normal',
        daysOnMarket: 51,
        location: 'San Ángel',
    },
    {
        id: 'prop-010',
        name: 'Local Comercial Santa Fe 85m²',
        type: 'local',
        price: 6200000,
        views: 167,
        leads: 13,
        visits: 6,
        offers: 1,
        status: 'normal',
        daysOnMarket: 45,
        location: 'Santa Fe',
    },
];

// Agent Performance Data
export const agentPerformance: AgentPerformance[] = [
    {
        id: 'agent-001',
        name: 'Ana García',
        avatar: 'AG',
        sales: 12,
        revenue: 48500000,
        commission: 2425000,
        leads: 89,
        conversionRate: 13.5,
        avgDaysToClose: 42,
        pipelineValue: 15200000,
    },
    {
        id: 'agent-002',
        name: 'Carlos Ruiz',
        avatar: 'CR',
        sales: 9,
        revenue: 42300000,
        commission: 2115000,
        leads: 76,
        conversionRate: 11.8,
        avgDaysToClose: 48,
        pipelineValue: 12800000,
    },
    {
        id: 'agent-003',
        name: 'María López',
        avatar: 'ML',
        sales: 8,
        revenue: 38900000,
        commission: 1945000,
        leads: 64,
        conversionRate: 12.5,
        avgDaysToClose: 45,
        pipelineValue: 11500000,
    },
    {
        id: 'agent-004',
        name: 'Juan Pérez',
        avatar: 'JP',
        sales: 6,
        revenue: 27600000,
        commission: 1380000,
        leads: 52,
        conversionRate: 11.5,
        avgDaysToClose: 51,
        pipelineValue: 8900000,
    },
    {
        id: 'agent-005',
        name: 'Sofía Torres',
        avatar: 'ST',
        sales: 5,
        revenue: 22100000,
        commission: 1105000,
        leads: 47,
        conversionRate: 10.6,
        avgDaysToClose: 54,
        pipelineValue: 7600000,
    },
];

// Revenue by Property Type
export const revenueByType: RevenueByType[] = [
    { type: 'Departamento', amount: 142000000, percentage: 59.2, fill: '#3B82F6' },
    { type: 'Casa', amount: 68000000, percentage: 28.3, fill: '#8B5CF6' },
    { type: 'Terreno', amount: 24000000, percentage: 10.0, fill: '#EC4899' },
    { type: 'Local', amount: 6000000, percentage: 2.5, fill: '#F59E0B' },
];

// Revenue by Source
export const revenueBySource: RevenueBySource[] = [
    { source: 'Inmuebles24', amount: 85000000 },
    { source: 'Sitio Web', amount: 62000000 },
    { source: 'Referidos', amount: 48000000 },
    { source: 'Redes Sociales', amount: 32000000 },
    { source: 'Walk-ins', amount: 13000000 },
];

// Monthly Trend Data (Last 12 months)
export const monthlyTrends: MonthlyData[] = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), 11 - i);
    const baseLeads = 120 + Math.random() * 40;
    const baseSales = 14 + Math.random() * 8;

    return {
        month: format(date, 'MMM yyyy'),
        leads: Math.round(baseLeads),
        sales: Math.round(baseSales),
        revenue: Math.round(baseSales * 130000 * (1 + Math.random() * 0.4)),
        commission: Math.round(baseSales * 130000 * 0.05 * (1 + Math.random() * 0.4)),
    };
});

// Helper functions
export function calculateChange(current: number, previous: number): {
    value: number;
    percentage: number;
    type: 'increase' | 'decrease' | 'neutral';
} {
    const diff = current - previous;
    const percentage = previous !== 0 ? (diff / previous) * 100 : 0;

    return {
        value: diff,
        percentage: Math.abs(percentage),
        type: diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'neutral',
    };
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

export function formatPercentage(num: number): string {
    return `${num.toFixed(1)}%`;
}
