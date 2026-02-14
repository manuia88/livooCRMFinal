import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Target } from 'lucide-react';

export default function OportunidadesPage() {
  return (
    <ModulePlaceholder
      title="Oportunidades"
      description="Pipeline visual estilo Kanban con 12 etapas personalizables"
      icon={Target}
      features={[
        'Vista Kanban drag & drop',
        'Pipeline de 12 etapas',
        'Forecasting automático',
        'Notificaciones de seguimiento',
        'Reportes de conversión',
        'Análisis de embudo',
      ]}
    />
  );
}
