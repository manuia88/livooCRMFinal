import type { Task } from '@/types';

// ============================================================================
// MOCK TASKS
// ============================================================================

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Seguimiento lead VIP Roberto Sánchez',
    description: 'Llamar para confirmar visita a prop-001 el viernes.',
    type: 'llamada',
    status: 'pendiente',
    priority: 'urgente',
    dueDate: '2024-02-14T10:00:00Z',
    assignedTo: 'agent-1',
    createdBy: 'agent-1',
    relatedTo: {
      type: 'contact',
      id: 'contact-001',
      name: 'Roberto Sánchez',
    },
    tags: ['VIP', 'Seguimiento'],
    createdAt: '2024-02-13T09:00:00Z',
    updatedAt: '2024-02-13T09:00:00Z',
  },
  {
    id: 'task-002',
    title: 'Preparar propuesta formal para María González',
    description: 'Elaborar propuesta de compra para prop-009 con opciones de financiamiento.',
    type: 'otro',
    status: 'en-progreso',
    priority: 'alta',
    dueDate: '2024-02-15T17:00:00Z',
    assignedTo: 'agent-2',
    createdBy: 'agent-2',
    relatedTo: {
      type: 'opportunity',
      id: 'opp-002',
      name: 'Venta Departamento Providencia',
    },
    tags: ['Propuesta', 'Inversionista'],
    createdAt: '2024-02-12T14:00:00Z',
    updatedAt: '2024-02-13T11:00:00Z',
  },
  {
    id: 'task-003',
    title: 'Visita a prop-011 con Carlos Ramírez',
    description: 'Visita programada a casa en San Pedro. Confirmar día anterior.',
    type: 'visita',
    status: 'pendiente',
    priority: 'alta',
    dueDate: '2024-02-18T11:00:00Z',
    assignedTo: 'agent-3',
    createdBy: 'agent-3',
    relatedTo: {
      type: 'property',
      id: 'prop-011',
      name: 'Casa minimalista en San Pedro',
    },
    tags: ['Visita programada'],
    createdAt: '2024-02-13T10:00:00Z',
    updatedAt: '2024-02-13T10:00:00Z',
  },
  {
    id: 'task-004',
    title: 'Enviar contrato de renta a Sandra Morales',
    description: 'Enviar contrato para departamento ejecutivo en Santa Fe.',
    type: 'email',
    status: 'completada',
    priority: 'alta',
    dueDate: '2024-02-13T16:00:00Z',
    assignedTo: 'agent-4',
    createdBy: 'agent-4',
    relatedTo: {
      type: 'opportunity',
      id: 'opp-007',
      name: 'Renta Departamento Santa Fe',
    },
    tags: ['Contrato', 'Corporativo'],
    createdAt: '2024-02-11T09:00:00Z',
    updatedAt: '2024-02-13T15:30:00Z',
    completedAt: '2024-02-13T15:30:00Z',
  },
  {
    id: 'task-005',
    title: 'Actualizar fotografías de prop-005',
    description: 'Coordinar sesión fotográfica profesional para Casa Art Déco.',
    type: 'otro',
    status: 'pendiente',
    priority: 'media',
    dueDate: '2024-02-20T14:00:00Z',
    assignedTo: 'agent-2',
    createdBy: 'agent-2',
    relatedTo: {
      type: 'property',
      id: 'prop-005',
      name: 'Casa Art Déco en Condesa',
    },
    tags: ['Marketing', 'Fotografía'],
    createdAt: '2024-02-10T11:00:00Z',
    updatedAt: '2024-02-10T11:00:00Z',
  },
  {
    id: 'task-006',
    title: 'Llamada de bienvenida a Jorge Flores',
    description: 'Primer contacto con lead nuevo. Calificar y entender necesidades.',
    type: 'llamada',
    status: 'pendiente',
    priority: 'media',
    dueDate: '2024-02-14T15:00:00Z',
    assignedTo: 'agent-2',
    createdBy: 'agent-2',
    relatedTo: {
      type: 'contact',
      id: 'contact-007',
      name: 'Jorge Flores',
    },
    tags: ['Lead nuevo', 'Calificación'],
    createdAt: '2024-02-12T08:30:00Z',
    updatedAt: '2024-02-12T08:30:00Z',
  },
  {
    id: 'task-007',
    title: 'Reunión con Miguel Vargas - Portfolio review',
    description: 'Presentar oportunidades de inversión para Q1 2024.',
    type: 'reunion',
    status: 'pendiente',
    priority: 'alta',
    dueDate: '2024-02-16T10:00:00Z',
    assignedTo: 'agent-3',
    createdBy: 'agent-3',
    relatedTo: {
      type: 'contact',
      id: 'contact-009',
      name: 'Miguel Vargas',
    },
    tags: ['VIP', 'Inversionista', 'Portfolio'],
    createdAt: '2024-02-13T15:30:00Z',
    updatedAt: '2024-02-13T15:30:00Z',
  },
  {
    id: 'task-008',
    title: 'Enviar opciones pet friendly a Ana Martínez',
    description: 'Compartir por WhatsApp 3 opciones de lofts/deptos pet friendly en Roma.',
    type: 'whatsapp',
    status: 'completada',
    priority: 'media',
    dueDate: '2024-02-12T12:00:00Z',
    assignedTo: 'agent-1',
    createdBy: 'agent-1',
    relatedTo: {
      type: 'contact',
      id: 'contact-004',
      name: 'Ana Martínez',
    },
    tags: ['Pet friendly'],
    createdAt: '2024-02-11T10:00:00Z',
    updatedAt: '2024-02-12T11:30:00Z',
    completedAt: '2024-02-12T11:30:00Z',
  },
  {
    id: 'task-009',
    title: 'Seguimiento Laura Castillo - reactivar',
    description: 'Intentar reactivar contacto inactivo. Ofrecer nuevas opciones en Condesa.',
    type: 'email',
    status: 'cancelada',
    priority: 'baja',
    dueDate: '2024-02-10T14:00:00Z',
    assignedTo: 'agent-1',
    createdBy: 'agent-1',
    relatedTo: {
      type: 'contact',
      id: 'contact-010',
      name: 'Laura Castillo',
    },
    tags: ['Inactivo', 'Reactivación'],
    createdAt: '2024-02-08T09:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'task-010',
    title: 'Revisar documentación apartado prop-003',
    description: 'Verificar documentación completa para penthouse Roma Norte.',
    type: 'otro',
    status: 'en-progreso',
    priority: 'urgente',
    dueDate: '2024-02-14T12:00:00Z',
    assignedTo: 'agent-1',
    createdBy: 'agent-1',
    relatedTo: {
      type: 'opportunity',
      id: 'opp-006',
      name: 'Venta Penthouse Roma',
    },
    tags: ['Apartado', 'Urgente', 'Documentación'],
    createdAt: '2024-02-13T16:45:00Z',
    updatedAt: '2024-02-13T17:00:00Z',
  },
  {
    id: 'task-011',
    title: 'Preparar CMA para Patricia Torres',
    description: 'Análisis comparativo de mercado para casa en Condesa que quiere vender.',
    type: 'otro',
    status: 'pendiente',
    priority: 'media',
    dueDate: '2024-02-17T16:00:00Z',
    assignedTo: 'agent-1',
    createdBy: 'agent-1',
    relatedTo: {
      type: 'contact',
      id: 'contact-006',
      name: 'Patricia Torres',
    },
    tags: ['CMA', 'Valuación'],
    createdAt: '2024-02-13T10:00:00Z',
    updatedAt: '2024-02-13T10:00:00Z',
  },
  {
    id: 'task-012',
    title: 'Coordinar firma de contrato oficina Santa Fe',
    description: 'Agendar firma con Luis Hernández para renta de oficina.',
    type: 'reunion',
    status: 'pendiente',
    priority: 'urgente',
    dueDate: '2024-02-15T11:00:00Z',
    assignedTo: 'agent-4',
    createdBy: 'agent-4',
    relatedTo: {
      type: 'opportunity',
      id: 'opp-005',
      name: 'Renta Oficina Santa Fe',
    },
    tags: ['Cierre', 'Contrato'],
    createdAt: '2024-02-13T10:15:00Z',
    updatedAt: '2024-02-13T10:15:00Z',
  },
];

// ============================================================================
// TASK STATS
// ============================================================================

export function getTaskStats() {
  const now = new Date();
  let vencidas = 0;

  const stats = {
    total: mockTasks.length,
    pendientes: 0,
    enProgreso: 0,
    completadas: 0,
    vencidas: 0,
    completionRate: 0,
  };

  mockTasks.forEach((task) => {
    if (task.status === 'pendiente') stats.pendientes++;
    if (task.status === 'en-progreso') stats.enProgreso++;
    if (task.status === 'completada') stats.completadas++;

    // Check if overdue
    const dueDate = new Date(task.dueDate);
    if (
      (task.status === 'pendiente' || task.status === 'en-progreso') &&
      dueDate < now
    ) {
      vencidas++;
    }
  });

  stats.vencidas = vencidas;
  stats.completionRate = (stats.completadas / stats.total) * 100;

  return stats;
}
