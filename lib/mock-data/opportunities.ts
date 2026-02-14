import type { Opportunity, OpportunityActivity } from '@/types';

// ============================================================================
// MOCK OPPORTUNITIES
// ============================================================================

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-001',
    title: 'Venta Casa Polanco - Roberto Sánchez',
    contactId: 'contact-001',
    propertyId: 'prop-001',
    type: 'venta',
    stage: 'negociacion',
    priority: 'alta',
    value: 45000000,
    currency: 'MXN',
    probability: 75,
    expectedCloseDate: '2024-03-15',
    assignedTo: 'agent-1',
    tags: ['VIP', 'Alta prioridad'],
    notes: 'Cliente muy interesado. Negociando precio final.',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-12T14:30:00Z',
  },
  {
    id: 'opp-002',
    title: 'Venta Departamento Providencia - María González',
    contactId: 'contact-002',
    propertyId: 'prop-009',
    type: 'venta',
    stage: 'propuesta',
    priority: 'alta',
    value: 22000000,
    currency: 'MXN',
    probability: 60,
    expectedCloseDate: '2024-03-30',
    assignedTo: 'agent-2',
    tags: ['Inversionista'],
    notes: 'Enviada propuesta formal. Esperando respuesta.',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-02-11T16:15:00Z',
  },
  {
    id: 'opp-003',
    title: 'Venta Casa San Pedro - Carlos Ramírez',
    contactId: 'contact-003',
    propertyId: 'prop-011',
    type: 'venta',
    stage: 'visita-agendada',
    priority: 'media',
    value: 35000000,
    currency: 'MXN',
    probability: 40,
    expectedCloseDate: '2024-04-15',
    assignedTo: 'agent-3',
    tags: ['Mudanza corporativa'],
    notes: 'Visita agendada para el 18 de febrero.',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-13T11:20:00Z',
  },
  {
    id: 'opp-004',
    title: 'Renta Loft Roma - Ana Martínez',
    contactId: 'contact-004',
    propertyId: 'prop-004',
    type: 'renta',
    stage: 'presentacion',
    priority: 'media',
    value: 35000,
    currency: 'MXN',
    probability: 50,
    expectedCloseDate: '2024-03-01',
    assignedTo: 'agent-1',
    tags: ['Pet friendly'],
    notes: 'Presentando opciones pet friendly.',
    createdAt: '2024-02-08T14:00:00Z',
    updatedAt: '2024-02-12T09:30:00Z',
  },
  {
    id: 'opp-005',
    title: 'Renta Oficina Santa Fe - Luis Hernández',
    contactId: 'contact-005',
    propertyId: 'prop-008',
    type: 'renta',
    stage: 'visita-realizada',
    priority: 'alta',
    value: 8500000,
    currency: 'MXN',
    probability: 70,
    expectedCloseDate: '2024-02-28',
    assignedTo: 'agent-4',
    tags: ['Startup', 'Urgente'],
    notes: 'Visita realizada. Les gustó mucho. Preparando contrato.',
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-02-13T10:15:00Z',
  },
  {
    id: 'opp-006',
    title: 'Venta Penthouse Roma - Prospecto',
    contactId: 'contact-002',
    propertyId: 'prop-003',
    type: 'venta',
    stage: 'apartado',
    priority: 'urgente',
    value: 18000000,
    currency: 'MXN',
    probability: 90,
    expectedCloseDate: '2024-02-25',
    assignedTo: 'agent-1',
    tags: ['VIP', 'Apartado'],
    notes: 'Apartado con anticipo. Revisando documentación.',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-02-13T16:45:00Z',
  },
  {
    id: 'opp-007',
    title: 'Renta Departamento Santa Fe - Sandra Morales',
    contactId: 'contact-008',
    propertyId: 'prop-007',
    type: 'renta',
    stage: 'documentacion',
    priority: 'alta',
    value: 42000,
    currency: 'MXN',
    probability: 85,
    expectedCloseDate: '2024-02-20',
    assignedTo: 'agent-4',
    tags: ['Corporativo'],
    notes: 'Revisando referencias corporativas.',
    createdAt: '2024-02-03T09:00:00Z',
    updatedAt: '2024-02-11T14:00:00Z',
  },
  {
    id: 'opp-008',
    title: 'Venta Penthouse San Pedro - Miguel Vargas',
    contactId: 'contact-009',
    propertyId: 'prop-012',
    type: 'venta',
    stage: 'calificado',
    priority: 'alta',
    value: 16000000,
    currency: 'MXN',
    probability: 55,
    expectedCloseDate: '2024-04-30',
    assignedTo: 'agent-3',
    tags: ['VIP', 'Inversionista'],
    notes: 'Cliente calificado. Inversionista con múltiples propiedades.',
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-13T15:30:00Z',
  },
  {
    id: 'opp-009',
    title: 'Renta Departamento Providencia - Lead nuevo',
    contactId: 'contact-002',
    propertyId: 'prop-010',
    type: 'renta',
    stage: 'contactado',
    priority: 'media',
    value: 32000,
    currency: 'MXN',
    probability: 30,
    expectedCloseDate: '2024-03-31',
    assignedTo: 'agent-2',
    tags: [],
    notes: 'Primer contacto realizado. Enviando información.',
    createdAt: '2024-02-10T11:00:00Z',
    updatedAt: '2024-02-10T11:00:00Z',
  },
  {
    id: 'opp-010',
    title: 'Venta Local Zona Rosa - Lead perdido',
    contactId: 'contact-010',
    propertyId: 'prop-014',
    type: 'renta',
    stage: 'perdido',
    priority: 'baja',
    value: 85000,
    currency: 'MXN',
    probability: 0,
    expectedCloseDate: '2024-02-15',
    assignedTo: 'agent-1',
    tags: ['Perdido'],
    notes: 'Cliente decidió no continuar. Presupuesto insuficiente.',
    lostReason: 'Presupuesto',
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-02-08T10:00:00Z',
    closedAt: '2024-02-08T10:00:00Z',
  },
];

// ============================================================================
// MOCK OPPORTUNITY ACTIVITIES
// ============================================================================

export const mockOpportunityActivities: OpportunityActivity[] = [
  {
    id: 'opp-activity-001',
    opportunityId: 'opp-001',
    type: 'stage-change',
    title: 'Etapa actualizada',
    description: 'Movido de "Propuesta" a "Negociación"',
    previousStage: 'propuesta',
    newStage: 'negociacion',
    createdBy: 'agent-1',
    createdAt: '2024-02-12T14:30:00Z',
  },
  {
    id: 'opp-activity-002',
    opportunityId: 'opp-001',
    type: 'call',
    title: 'Llamada de negociación',
    description: 'Discutimos precio final y condiciones.',
    createdBy: 'agent-1',
    createdAt: '2024-02-12T14:00:00Z',
  },
  {
    id: 'opp-activity-003',
    opportunityId: 'opp-006',
    type: 'stage-change',
    title: 'Propiedad apartada',
    description: 'Cliente realizó depósito de apartado',
    previousStage: 'visita-realizada',
    newStage: 'apartado',
    createdBy: 'agent-1',
    createdAt: '2024-02-13T16:45:00Z',
  },
  {
    id: 'opp-activity-004',
    opportunityId: 'opp-005',
    type: 'meeting',
    title: 'Visita a oficina',
    description: 'Tour por las instalaciones. Feedback muy positivo.',
    createdBy: 'agent-4',
    createdAt: '2024-02-12T10:00:00Z',
  },
  {
    id: 'opp-activity-005',
    opportunityId: 'opp-010',
    type: 'stage-change',
    title: 'Oportunidad perdida',
    description: 'Cliente indicó que el presupuesto era muy alto',
    previousStage: 'propuesta',
    newStage: 'perdido',
    createdBy: 'agent-1',
    createdAt: '2024-02-08T10:00:00Z',
  },
];

// ============================================================================
// OPPORTUNITY STATS
// ============================================================================

export function getOpportunityStats() {
  const byStage = {
    'lead-nuevo': 0,
    'contactado': 0,
    'calificado': 0,
    'presentacion': 0,
    'visita-agendada': 0,
    'visita-realizada': 0,
    'propuesta': 0,
    'negociacion': 0,
    'apartado': 0,
    'documentacion': 0,
    'cierre': 0,
    'perdido': 0,
  };

  let totalValue = 0;
  let wonDeals = 0;
  let lostDeals = 0;

  mockOpportunities.forEach((opp) => {
    byStage[opp.stage]++;
    totalValue += opp.value;

    if (opp.stage === 'cierre') wonDeals++;
    if (opp.stage === 'perdido') lostDeals++;
  });

  const totalDeals = wonDeals + lostDeals;
  const winRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;

  return {
    total: mockOpportunities.length,
    totalValue,
    averageValue: totalValue / mockOpportunities.length,
    winRate,
    averageDaysToClose: 45, // Placeholder
    byStage,
  };
}
