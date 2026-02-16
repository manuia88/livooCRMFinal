// Mock database of comparable properties for valuation algorithm
export interface ComparableProperty {
    id: string;
    tipo: 'Casa' | 'Departamento' | 'Penthouse' | 'Loft' | 'Townhouse';
    alcaldia: string;
    colonia: string;
    precio: number; // in MXN
    m2Terreno?: number;
    m2Construccion: number;
    recamaras: number;
    banos: number;
    estacionamientos: number;
    antiguedad: number; // years
    estado: 'Excelente' | 'Bueno' | 'Regular' | 'Necesita Remodelación';
    amenidades: string[];
    precioM2: number; // calculated
    fechaVenta?: Date;
}

export const mockComparables: ComparableProperty[] = [
    // POLANCO
    {
        id: 'comp-1',
        tipo: 'Departamento',
        alcaldia: 'Miguel Hidalgo',
        colonia: 'Polanco',
        precio: 12500000,
        m2Construccion: 180,
        recamaras: 3,
        banos: 3,
        estacionamientos: 2,
        antiguedad: 5,
        estado: 'Excelente',
        amenidades: ['Gym', 'Alberca', 'Seguridad 24/7', 'Roof Garden'],
        precioM2: 69444,
    },
    {
        id: 'comp-2',
        tipo: 'Penthouse',
        alcaldia: 'Miguel Hidalgo',
        colonia: 'Polanco',
        precio: 25000000,
        m2Construccion: 320,
        recamaras: 4,
        banos: 4,
        estacionamientos: 3,
        antiguedad: 2,
        estado: 'Excelente',
        amenidades: ['Gym', 'Alberca', 'Seguridad 24/7', 'Roof Garden', 'Jacuzzi Privado'],
        precioM2: 78125,
    },
    {
        id: 'comp-3',
        tipo: 'Casa',
        alcaldia: 'Miguel Hidalgo',
        colonia: 'Polanco',
        precio: 45000000,
        m2Terreno: 350,
        m2Construccion: 520,
        recamaras: 5,
        banos: 6,
        estacionamientos: 4,
        antiguedad: 8,
        estado: 'Excelente',
        amenidades: ['Jardín', 'Terraza', 'Cuarto de Servicio', 'Bodega'],
        precioM2: 86538,
    },

    // ROMA NORTE
    {
        id: 'comp-4',
        tipo: 'Departamento',
        alcaldia: 'Cuauhtémoc',
        colonia: 'Roma Norte',
        precio: 6500000,
        m2Construccion: 120,
        recamaras: 2,
        banos: 2,
        estacionamientos: 1,
        antiguedad: 3,
        estado: 'Excelente',
        amenidades: ['Roof Garden', 'Coworking', 'Bike Parking'],
        precioM2: 54167,
    },
    {
        id: 'comp-5',
        tipo: 'Loft',
        alcaldia: 'Cuauhtémoc',
        colonia: 'Roma Norte',
        precio: 4200000,
        m2Construccion: 85,
        recamaras: 1,
        banos: 1,
        estacionamientos: 1,
        antiguedad: 1,
        estado: 'Excelente',
        amenidades: ['Roof Garden', 'Pet Friendly'],
        precioM2: 49412,
    },
    {
        id: 'comp-6',
        tipo: 'Departamento',
        alcaldia: 'Cuauhtémoc',
        colonia: 'Roma Norte',
        precio: 8200000,
        m2Construccion: 150,
        recamaras: 2,
        banos: 2,
        estacionamientos: 2,
        antiguedad: 10,
        estado: 'Bueno',
        amenidades: ['Balcón', 'Seguridad'],
        precioM2: 54667,
    },

    // CONDESA
    {
        id: 'comp-7',
        tipo: 'Departamento',
        alcaldia: 'Cuauhtémoc',
        colonia: 'Condesa',
        precio: 7800000,
        m2Construccion: 140,
        recamaras: 2,
        banos: 2,
        estacionamientos: 1,
        antiguedad: 6,
        estado: 'Excelente',
        amenidades: ['Balcón', 'Roof Garden', 'Gym'],
        precioM2: 55714,
    },
    {
        id: 'comp-8',
        tipo: 'Casa',
        alcaldia: 'Cuauhtémoc',
        colonia: 'Condesa',
        precio: 18500000,
        m2Terreno: 200,
        m2Construccion: 280,
        recamaras: 4,
        banos: 3,
        estacionamientos: 2,
        antiguedad: 15,
        estado: 'Bueno',
        amenidades: ['Jardín', 'Terraza', 'Estudio'],
        precioM2: 66071,
    },

    // DEL VALLE
    {
        id: 'comp-9',
        tipo: 'Departamento',
        alcaldia: 'Benito Juárez',
        colonia: 'Del Valle',
        precio: 5500000,
        m2Construccion: 110,
        recamaras: 2,
        banos: 2,
        estacionamientos: 1,
        antiguedad: 8,
        estado: 'Bueno',
        amenidades: ['Gym', 'Seguridad 24/7'],
        precioM2: 50000,
    },
    {
        id: 'comp-10',
        tipo: 'Departamento',
        alcaldia: 'Benito Juárez',
        colonia: 'Del Valle',
        precio: 4800000,
        m2Construccion: 95,
        recamaras: 2,
        banos: 1,
        estacionamientos: 1,
        antiguedad: 12,
        estado: 'Regular',
        amenidades: ['Seguridad'],
        precioM2: 50526,
    },
    {
        id: 'comp-11',
        tipo: 'Casa',
        alcaldia: 'Benito Juárez',
        colonia: 'Del Valle',
        precio: 12000000,
        m2Terreno: 180,
        m2Construccion: 240,
        recamaras: 3,
        banos: 3,
        estacionamientos: 2,
        antiguedad: 20,
        estado: 'Bueno',
        amenidades: ['Jardín', 'Terraza'],
        precioM2: 50000,
    },

    // COYOACÁN
    {
        id: 'comp-12',
        tipo: 'Casa',
        alcaldia: 'Coyoacán',
        colonia: 'Coyoacán Centro',
        precio: 15000000,
        m2Terreno: 250,
        m2Construccion: 300,
        recamaras: 4,
        banos: 3,
        estacionamientos: 3,
        antiguedad: 25,
        estado: 'Bueno',
        amenidades: ['Jardín', 'Chimenea', 'Estudio'],
        precioM2: 50000,
    },
    {
        id: 'comp-13',
        tipo: 'Departamento',
        alcaldia: 'Coyoacán',
        colonia: 'Del Carmen',
        precio: 4500000,
        m2Construccion: 90,
        recamaras: 2,
        banos: 2,
        estacionamientos: 1,
        antiguedad: 5,
        estado: 'Excelente',
        amenidades: ['Roof Garden', 'Pet Friendly'],
        precioM2: 50000,
    },

    // NARVARTE
    {
        id: 'comp-14',
        tipo: 'Departamento',
        alcaldia: 'Benito Juárez',
        colonia: 'Narvarte',
        precio: 3200000,
        m2Construccion: 80,
        recamaras: 2,
        banos: 1,
        estacionamientos: 1,
        antiguedad: 15,
        estado: 'Regular',
        amenidades: ['Seguridad'],
        precioM2: 40000,
    },
    {
        id: 'comp-15',
        tipo: 'Departamento',
        alcaldia: 'Benito Juárez',
        colonia: 'Narvarte',
        precio: 4500000,
        m2Construccion: 105,
        recamaras: 2,
        banos: 2,
        estacionamientos: 1,
        antiguedad: 3,
        estado: 'Excelente',
        amenidades: ['Gym', 'Roof Garden', 'Coworking'],
        precioM2: 42857,
    },

    // SAN ÁNGEL
    {
        id: 'comp-16',
        tipo: 'Casa',
        alcaldia: 'Álvaro Obregón',
        colonia: 'San Ángel',
        precio: 28000000,
        m2Terreno: 400,
        m2Construccion: 450,
        recamaras: 5,
        banos: 5,
        estacionamientos: 4,
        antiguedad: 12,
        estado: 'Excelente',
        amenidades: ['Jardín', 'Alberca', 'Cuarto de Servicio', 'Bodega'],
        precioM2: 62222,
    },
    {
        id: 'comp-17',
        tipo: 'Departamento',
        alcaldia: 'Álvaro Obregón',
        colonia: 'San Ángel',
        precio: 8500000,
        m2Construccion: 160,
        recamaras: 3,
        banos: 3,
        estacionamientos: 2,
        antiguedad: 7,
        estado: 'Excelente',
        amenidades: ['Jardín Común', 'Seguridad 24/7'],
        precioM2: 53125,
    },

    // SANTA FE
    {
        id: 'comp-18',
        tipo: 'Departamento',
        alcaldia: 'Cuajimalpa',
        colonia: 'Santa Fe',
        precio: 9500000,
        m2Construccion: 145,
        recamaras: 2,
        banos: 2,
        estacionamientos: 2,
        antiguedad: 4,
        estado: 'Excelente',
        amenidades: ['Gym', 'Alberca', 'Business Center', 'Seguridad 24/7'],
        precioM2: 65517,
    },
    {
        id: 'comp-19',
        tipo: 'Penthouse',
        alcaldia: 'Cuajimalpa',
        colonia: 'Santa Fe',
        precio: 18000000,
        m2Construccion: 250,
        recamaras: 3,
        banos: 3,
        estacionamientos: 3,
        antiguedad: 2,
        estado: 'Excelente',
        amenidades: ['Gym', 'Alberca', 'Sky Lounge', 'Roof Garden Privado'],
        precioM2: 72000,
    },

    // LINDAVISTA
    {
        id: 'comp-20',
        tipo: 'Departamento',
        alcaldia: 'Gustavo A. Madero',
        colonia: 'Lindavista',
        precio: 2800000,
        m2Construccion: 70,
        recamaras: 2,
        banos: 1,
        estacionamientos: 1,
        antiguedad: 18,
        estado: 'Regular',
        amenidades: ['Seguridad'],
        precioM2: 40000,
    },
];

// Helper function to find comparable properties
export function findComparables(
    tipo: string,
    alcaldia: string,
    m2Construccion: number,
    maxResults: number = 5
): ComparableProperty[] {
    const tolerance = 0.3; // ±30% m2 tolerance

    return mockComparables
        .filter((prop) => {
            const matchesTipo = prop.tipo === tipo;
            const matchesAlcaldia = prop.alcaldia === alcaldia;
            const matchesSize =
                prop.m2Construccion >= m2Construccion * (1 - tolerance) &&
                prop.m2Construccion <= m2Construccion * (1 + tolerance);

            return matchesTipo && matchesAlcaldia && matchesSize;
        })
        .sort((a, b) => {
            // Sort by similarity in m2
            const diffA = Math.abs(a.m2Construccion - m2Construccion);
            const diffB = Math.abs(b.m2Construccion - m2Construccion);
            return diffA - diffB;
        })
        .slice(0, maxResults);
}
