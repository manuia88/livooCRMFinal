import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Users } from 'lucide-react';

export default function ContactosPage() {
  return (
    <ModulePlaceholder
      title="Contactos 2.0"
      description="CRM completo con lead scoring inteligente y gestión de relaciones"
      icon={Users}
      features={[
        'Lead scoring automático',
        'Segmentación avanzada',
        'Timeline de actividades',
        'Matching con propiedades',
        'Import/Export masivo',
        'Integración con formularios',
      ]}
    />
  );
}
