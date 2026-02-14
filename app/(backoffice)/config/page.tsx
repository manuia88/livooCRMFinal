import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Settings } from 'lucide-react';

export default function ConfigPage() {
  return (
    <ModulePlaceholder
      title="Configuración"
      description="Configuración global: usuarios, equipo, integraciones, facturación"
      icon={Settings}
      features={[
        'Gestión de usuarios',
        'Roles y permisos',
        'Configuración de equipo',
        'Integraciones API',
        'Personalización',
        'Facturación y suscripción',
      ]}
    />
  );
}
