import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { ClipboardList } from 'lucide-react';

export default function CaptacionesPage() {
  return (
    <ModulePlaceholder
      title="Captaciones"
      description="Gestiona el proceso de captación de nuevas propiedades para tu portafolio"
      icon={ClipboardList}
      features={[
        'Formulario de captación completo',
        'Workflow de aprobación',
        'Estimación automática de precio',
        'Calendario de visitas',
        'Generación de contratos',
        'Historial de captaciones',
      ]}
    />
  );
}
