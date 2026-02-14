// ============================================================================
// OPPORTUNITY TYPES
// ============================================================================

export type OpportunityStage =
  | 'lead-nuevo'
  | 'contactado'
  | 'calificado'
  | 'presentacion'
  | 'visita-agendada'
  | 'visita-realizada'
  | 'propuesta'
  | 'negociacion'
  | 'apartado'
  | 'documentacion'
  | 'cierre'
  | 'perdido';

export type OpportunityType = 'venta' | 'renta';

export type OpportunityPriority = 'baja' | 'media' | 'alta' | 'urgente';

// ============================================================================
// INTERFACES
// ============================================================================

export interface Opportunity {
  id: string;
  title: string;
  contactId: string;
  propertyId?: string;
  type: OpportunityType;
  stage: OpportunityStage;
  priority: OpportunityPriority;
  value: number;
  currency: 'MXN' | 'USD';
  probability: number; // 0-100
  expectedCloseDate: string;
  assignedTo: string; // Agent ID
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  lostReason?: string;
}

export interface OpportunityActivity {
  id: string;
  opportunityId: string;
  type: 'stage-change' | 'note' | 'call' | 'email' | 'meeting' | 'task-completed';
  title: string;
  description: string;
  previousStage?: OpportunityStage;
  newStage?: OpportunityStage;
  createdBy: string; // Agent ID
  createdAt: string;
}

export interface OpportunityStats {
  total: number;
  totalValue: number;
  averageValue: number;
  winRate: number;
  averageDaysToClose: number;
  byStage: Record<OpportunityStage, number>;
}

export interface PipelineStage {
  id: OpportunityStage;
  label: string;
  color: string;
  count: number;
  value: number;
}
