import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Workflow } from 'lucide-react';

export default function AutomatizacionesPage() {
  return (
    <ModulePlaceholder
      title="Automatizaciones"
      description="Constructor visual de workflows tipo Zapier/Make para automatizar procesos"
      icon={Workflow}
      features={[
        'Editor visual de flujos',
        'Triggers configurables',
        'Acciones múltiples',
        'Condiciones lógicas',
        'Integraciones externas',
        'Historial de ejecuciones',
      ]}
    />
  );
}
