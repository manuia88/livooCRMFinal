// ============================================================================
// CONTACT TYPES
// ============================================================================

export type ContactType =
  | 'comprador'
  | 'vendedor'
  | 'arrendador'
  | 'arrendatario'
  | 'inversionista';

export type ContactStatus =
  | 'lead'
  | 'prospecto'
  | 'cliente'
  | 'inactivo';

export type LeadSource =
  | 'web'
  | 'facebook'
  | 'instagram'
  | 'google'
  | 'referido'
  | 'walk-in'
  | 'cold-call'
  | 'whatsapp'
  | 'email';

export type LeadScore = 'frio' | 'tibio' | 'caliente';

// ============================================================================
// INTERFACES
// ============================================================================

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: ContactType[];
  status: ContactStatus;
  leadSource: LeadSource;
  leadScore: LeadScore;
  assignedTo: string; // Agent ID
  tags: string[];
  notes: string;
  propertyInterests: string[]; // Property IDs
  budget?: number;
  currency?: 'MXN' | 'USD';
  preferredNeighborhoods?: string[];
  createdAt: string;
  updatedAt: string;
  lastContactDate?: string;
}

export interface ContactActivity {
  id: string;
  contactId: string;
  type: 'call' | 'email' | 'whatsapp' | 'meeting' | 'property-view' | 'note';
  title: string;
  description: string;
  createdBy: string; // Agent ID
  createdAt: string;
}

export interface ContactStats {
  total: number;
  leads: number;
  prospectos: number;
  clientes: number;
  inactivos: number;
  conversionRate: number;
  averageLeadScore: number;
}
