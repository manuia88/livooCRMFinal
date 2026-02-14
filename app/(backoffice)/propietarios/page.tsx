import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { UserCircle } from 'lucide-react';

export default function PropietariosPage() {
  return (
    <ModulePlaceholder
      title="Portal Propietarios"
      description="Portal de autoservicio para que propietarios vean el estado de sus propiedades"
      icon={UserCircle}
      features={[
        'Dashboard de propietario',
        'Estado de publicaciones',
        'Visitas programadas',
        'Leads recibidos',
        'Documentos compartidos',
        'Mensajería directa',
      ]}
    />
  );
}
