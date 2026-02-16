import { ComparableProperty, findComparables } from '../mock-data/comparables';

export interface PropertyValuationInput {
    tipo: 'Casa' | 'Departamento' | 'Penthouse' | 'Loft' | 'Townhouse';
    alcaldia: string;
    colonia: string;
    m2Terreno?: number;
    m2Construccion: number;
    recamaras: number;
    banos: number;
    estacionamientos: number;
    antiguedad: number;
    estado: 'Excelente' | 'Bueno' | 'Regular' | 'Necesita Remodelación';
    amenidades: string[];
}

export interface ValuationResult {
    estimatedValue: number;
    minValue: number;
    maxValue: number;
    pricePerM2: number;
    confidence: 'Alta' | 'Media' | 'Baja';
    comparables: ComparableProperty[];
    marketInsights: {
        avgPriceM2: number;
        trend: 'up' | 'down' | 'stable';
        trendPercentage: number;
    };
}

export function calculateValuation(
    input: PropertyValuationInput
): ValuationResult {
    // Find comparable properties
    const comparables = findComparables(
        input.tipo,
        input.alcaldia,
        input.m2Construccion,
        5
    );

    // If no comparables found, use fallback estimation
    if (comparables.length === 0) {
        const fallbackPriceM2 = getFallbackPriceM2(input.alcaldia, input.tipo);
        const baseValue = fallbackPriceM2 * input.m2Construccion;

        return {
            estimatedValue: baseValue,
            minValue: baseValue * 0.85,
            maxValue: baseValue * 1.15,
            pricePerM2: fallbackPriceM2,
            confidence: 'Baja',
            comparables: [],
            marketInsights: {
                avgPriceM2: fallbackPriceM2,
                trend: 'stable',
                trendPercentage: 0,
            },
        };
    }

    // Calculate average price per m2 from comparables
    const avgPriceM2 =
        comparables.reduce((sum, prop) => sum + prop.precioM2, 0) /
        comparables.length;

    // Start with base value
    let baseValue = avgPriceM2 * input.m2Construccion;

    // Apply adjustments
    baseValue = applyConditionAdjustment(baseValue, input.estado);
    baseValue = applyAgeAdjustment(baseValue, input.antiguedad);
    baseValue = applyAmenitiesAdjustment(baseValue, input.amenidades);
    baseValue = applyLocationAdjustment(baseValue, input.tipo, input.alcaldia);

    // Calculate confidence based on number and quality of comparables
    const confidence = calculateConfidence(comparables, input);

    // Calculate value range (±10% for high confidence, ±20% for low)
    const rangePercent = confidence === 'Alta' ? 0.1 : confidence === 'Media' ? 0.15 : 0.2;
    const minValue = baseValue * (1 - rangePercent);
    const maxValue = baseValue * (1 + rangePercent);

    // Mock market insights (in real app, would come from historical data)
    const marketInsights = {
        avgPriceM2,
        trend: mockTrendForAlcaldia(input.alcaldia),
        trendPercentage: mockTrendPercentage(input.alcaldia),
    };

    return {
        estimatedValue: Math.round(baseValue),
        minValue: Math.round(minValue),
        maxValue: Math.round(maxValue),
        pricePerM2: Math.round(avgPriceM2),
        confidence,
        comparables,
        marketInsights,
    };
}

function applyConditionAdjustment(value: number, estado: string): number {
    const adjustments = {
        'Excelente': 1.10,
        'Bueno': 1.0,
        'Regular': 0.90,
        'Necesita Remodelación': 0.75,
    };
    return value * (adjustments[estado as keyof typeof adjustments] || 1.0);
}

function applyAgeAdjustment(value: number, antiguedad: number): number {
    // Depreciate 2% per year for first 10 years, then 1% per year
    if (antiguedad <= 10) {
        return value * (1 - antiguedad * 0.02);
    } else {
        return value * (1 - 10 * 0.02 - (antiguedad - 10) * 0.01);
    }
}

function applyAmenitiesAdjustment(value: number, amenidades: string[]): number {
    const premiumAmenities = [
        'Alberca',
        'Gym',
        'Roof Garden',
        'Seguridad 24/7',
        'Jacuzzi Privado',
        'Sky Lounge',
        'Business Center',
    ];

    const premiumCount = amenidades.filter((a) =>
        premiumAmenities.includes(a)
    ).length;

    // Add 3% per premium amenity, max 15%
    const adjustment = Math.min(premiumCount * 0.03, 0.15);
    return value * (1 + adjustment);
}

function applyLocationAdjustment(
    value: number,
    tipo: string,
    alcaldia: string
): number {
    // Premium multipliers for specific alcaldías
    const premiumAlcaldias = {
        'Miguel Hidalgo': 1.1, // Polanco, Lomas
        'Cuajimalpa': 1.05, // Santa Fe
        'Coyoacán': 1.0,
        'Benito Juárez': 1.0,
        'Cuauhtémoc': 0.95, // Roma, Condesa (hipster tax offset)
    };

    const multiplier = premiumAlcaldias[alcaldia as keyof typeof premiumAlcaldias] || 1.0;
    return value * multiplier;
}

function calculateConfidence(
    comparables: ComparableProperty[],
    input: PropertyValuationInput
): 'Alta' | 'Media' | 'Baja' {
    if (comparables.length >= 4) {
        // Check if comparables are very similar
        const avgM2Diff =
            comparables.reduce(
                (sum, prop) => sum + Math.abs(prop.m2Construccion - input.m2Construccion),
                0
            ) / comparables.length;

        if (avgM2Diff < 20) return 'Alta';
        if (avgM2Diff < 50) return 'Media';
        return 'Baja';
    } else if (comparables.length >= 2) {
        return 'Media';
    }
    return 'Baja';
}

function getFallbackPriceM2(alcaldia: string, tipo: string): number {
    // Fallback price per m2 when no comparables found
    const basePrices: Record<string, number> = {
        'Miguel Hidalgo': 70000,
        'Cuauhtémoc': 55000,
        'Benito Juárez': 50000,
        'Coyoacán': 48000,
        'Cuajimalpa': 65000,
        'Álvaro Obregón': 52000,
        'Gustavo A. Madero': 35000,
    };

    const basePrice = basePrices[alcaldia] || 45000;

    // Adjust for property type
    if (tipo === 'Penthouse') return basePrice * 1.3;
    if (tipo === 'Casa') return basePrice * 1.2;
    if (tipo === 'Loft') return basePrice * 0.95;
    return basePrice;
}

function mockTrendForAlcaldia(alcaldia: string): 'up' | 'down' | 'stable' {
    // Mock trends (in real app would come from market data)
    const trends: Record<string, 'up' | 'down' | 'stable'> = {
        'Miguel Hidalgo': 'up',
        'Cuauhtémoc': 'up',
        'Benito Juárez': 'stable',
        'Coyoacán': 'stable',
        'Cuajimalpa': 'down',
        'Álvaro Obregón': 'stable',
    };
    return trends[alcaldia] || 'stable';
}

function mockTrendPercentage(alcaldia: string): number {
    // Mock trend percentages for last 12 months
    const percentages: Record<string, number> = {
        'Miguel Hidalgo': 8.5,
        'Cuauhtémoc': 12.3,
        'Benito Juárez': 2.1,
        'Coyoacán': -1.5,
        'Cuajimalpa': -3.2,
        'Álvaro Obregón': 1.8,
    };
    return percentages[alcaldia] || 0;
}

// Format currency helper
export function formatCurrency(value: number): string {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value.toLocaleString('es-MX')}`;
}
