import { addDays, format, subDays } from 'date-fns';

export type UnitStatus = 'available' | 'reserved' | 'sold' | 'blocked';

export interface Unit {
    id: string;
    number: string;
    type: string; // e.g., "2 Recámaras", "Penthouse"
    floor: number;
    price: number;
    area: number; // m²
    bedrooms: number;
    bathrooms: number;
    status: UnitStatus;
    reservedBy?: string;
    reservedAt?: string;
    soldTo?: string;
    soldAt?: string;
}

export interface Floor {
    number: number;
    units: Unit[];
}

export interface Tower {
    id: string;
    name: string;
    floors: Floor[];
}

export interface Development {
    id: string;
    name: string;
    location: string;
    totalUnits: number;
    inventoryValue: number;
    soldUnits: number;
    soldValue: number;
    completionPercentage: number;
    towers: Tower[];
}

export const developmentData: Development = {
    id: 'dev-001',
    name: 'Torre Virreyes',
    location: 'Polanco, CDMX',
    totalUnits: 45,
    inventoryValue: 385000000,
    soldUnits: 28,
    soldValue: 245000000,
    completionPercentage: 65,
    towers: [
        {
            id: 'tower-A',
            name: 'Torre A',
            floors: Array.from({ length: 15 }, (_, i) => {
                const floorNum = 15 - i; // Top down
                const unitsPerFloor = floorNum > 12 ? 2 : 3; // Penthouses on top

                return {
                    number: floorNum,
                    units: Array.from({ length: unitsPerFloor }, (_, j) => {
                        const unitType = floorNum > 12 ? 'Penthouse' : j === 0 ? '3 Recámaras' : '2 Recámaras';
                        const basePrice = floorNum > 12 ? 18000000 : 8500000 + (floorNum * 100000);
                        const area = floorNum > 12 ? 280 : j === 0 ? 150 : 120;
                        const bedrooms = floorNum > 12 ? 4 : j === 0 ? 3 : 2;
                        const bathrooms = floorNum > 12 ? 4.5 : j === 0 ? 3 : 2;

                        // Random status generation for mock data
                        const rand = Math.random();
                        let status: UnitStatus = 'available';
                        if (rand > 0.8) status = 'sold';
                        else if (rand > 0.6) status = 'reserved';
                        else if (rand > 0.55) status = 'blocked';

                        return {
                            id: `A-${floorNum}0${j + 1}`,
                            number: `${floorNum}0${j + 1}`,
                            type: unitType,
                            floor: floorNum,
                            price: basePrice,
                            area,
                            bedrooms,
                            bathrooms,
                            status,
                            ...(status === 'sold' && { soldTo: 'Cliente Confidencial', soldAt: '2025-11-15' }),
                            ...(status === 'reserved' && { reservedBy: 'Juan Pérez', reservedAt: '2026-02-10' }),
                        };
                    }),
                };
            }),
        },
    ],
};

// Mock Leads
export const leadsData = [
    { id: 1, name: 'Roberto Gómez', status: 'Interesado', interestedIn: '2 Recámaras', budget: '$9M', lastContact: 'Hace 2 días' },
    { id: 2, name: 'María Valencia', status: 'Visita Agendada', interestedIn: '3 Recámaras', budget: '$12M', lastContact: 'Hace 5 horas' },
    { id: 3, name: 'Carlos Slim (Jr)', status: 'Oferta', interestedIn: 'Penthouse', budget: '$20M', lastContact: 'Ayer' },
    { id: 4, name: 'Ana Torres', status: 'Nuevo', interestedIn: '2 Recámaras', budget: '$8.5M', lastContact: 'Hoy' },
    { id: 5, name: 'Luis Miguel', status: 'Contactado', interestedIn: 'Penthouse', budget: '$25M', lastContact: 'Hace 1 semana' },
];

// Mock Timeline
export const timelineData = [
    { id: 1, stage: 'Cimentación', status: 'completed', date: 'Jun 2024', description: 'Excavación y colado de cimientos profundos.' },
    { id: 2, stage: 'Estructura', status: 'completed', date: 'Dic 2024', description: 'Levantamiento de estructura de acero y concreto hasta el piso 15.' },
    { id: 3, stage: 'Albañilería', status: 'in-progress', date: 'Feb 2026', description: 'Muros divisorios e instalaciones hidrosanitarias en proceso (Pisos 5-10).' },
    { id: 4, stage: 'Acabados', status: 'pending', date: 'Ago 2026', description: 'Inicio de colocación de pisos, carpintería y cancelería.' },
    { id: 5, stage: 'Entrega', status: 'pending', date: 'Dic 2026', description: 'Entrega de unidades a propietarios.' },
];

// Mock Sales
export const salesData = [
    { id: 'REC-001', unit: '1001', client: 'Familia Ruiz', measure: '$9,200,000', status: 'Escriturado', date: '15 Nov 2025' },
    { id: 'REC-002', unit: '802', client: 'Inversiones ABC', measure: '$8,900,000', status: 'Contrato Firmado', date: '20 Dic 2025' },
    { id: 'REC-003', unit: '1401', client: 'Pedro Páramo', measure: '$19,500,000', status: 'Apartado', date: '10 Feb 2026' },
];

export const fileCategories = [
    { name: 'Legal', count: 12 },
    { name: 'Planos', count: 45 },
    { name: 'Marketing', count: 28 },
    { name: 'Finanzas', count: 8 },
];
