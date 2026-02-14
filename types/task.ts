// ============================================================================
// TASK TYPES
// ============================================================================

export type TaskType =
  | 'llamada'
  | 'email'
  | 'whatsapp'
  | 'reunion'
  | 'visita'
  | 'seguimiento'
  | 'otro';

export type TaskStatus =
  | 'pendiente'
  | 'en-progreso'
  | 'completada'
  | 'cancelada';

export type TaskPriority =
  | 'baja'
  | 'media'
  | 'alta'
  | 'urgente';

// ============================================================================
// INTERFACES
// ============================================================================

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedTo: string; // Agent ID
  createdBy: string; // Agent ID
  relatedTo?: {
    type: 'contact' | 'opportunity' | 'property';
    id: string;
    name: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface TaskStats {
  total: number;
  pendientes: number;
  enProgreso: number;
  completadas: number;
  vencidas: number;
  completionRate: number;
}
