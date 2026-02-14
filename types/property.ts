// ============================================================================
// PROPERTY TYPES
// ============================================================================

export type PropertyType =
  | 'casa'
  | 'departamento'
  | 'terreno'
  | 'local'
  | 'oficina'
  | 'bodega';

export type OperationType =
  | 'venta'
  | 'renta'
  | 'traspaso';

export type PropertyStatus =
  | 'disponible'
  | 'apartado'
  | 'vendido'
  | 'rentado'
  | 'inactivo';

export type Currency = 'MXN' | 'USD';

// ============================================================================
// INTERFACES
// ============================================================================

export interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'agente' | 'coordinador' | 'gerente';
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  operation: OperationType;
  status: PropertyStatus;
  price: number;
  currency: Currency;
  area: number; // m2
  landArea?: number; // m2 (para casas/terrenos)
  bedrooms: number;
  bathrooms: number;
  parking: number;
  address: Address;
  description: string;
  features: string[];
  images: string[];
  video?: string;
  tour360?: string;
  agent: Agent;
  healthScore?: number; // 0-100
  views: number;
  favorites: number;
  leads: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  type?: PropertyType[];
  operation?: OperationType[];
  status?: PropertyStatus[];
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  parking?: number[];
  cities?: string[];
  neighborhoods?: string[];
  features?: string[];
  healthScoreMin?: number;
}

export interface PropertyStats {
  total: number;
  disponible: number;
  apartado: number;
  vendido: number;
  rentado: number;
  inactivo: number;
  averagePrice: number;
  totalValue: number;
  averageHealthScore: number;
}
