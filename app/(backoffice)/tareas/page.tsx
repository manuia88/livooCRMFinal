import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { CheckSquare } from 'lucide-react';

export default function TareasPage() {
  return (
    <ModulePlaceholder
      title="Tareas 2.0"
      description="Gestión de tareas con 3 vistas: Lista, Calendario y Kanban"
      icon={CheckSquare}
      features={[
        'Vista de lista',
        'Vista de calendario',
        'Vista Kanban',
        'Tareas recurrentes',
        'Recordatorios automáticos',
        'Asignación a equipo',
      ]}
    />
  );
}
