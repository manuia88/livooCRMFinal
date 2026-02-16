import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Home } from 'lucide-react';

export default function DesarrollosPage() {
  return (
    <ModulePlaceholder
      title="Desarrollos"
      description="Gestión completa de desarrollos inmobiliarios con 7 tabs especializados"
      icon={Home}
      features={[
        'Ficha técnica del desarrollo',
        'Inventario de unidades',
        'Control de apartados',
        'Comisiones y pagos',
        'Documentación',
        'Cronograma de obra',
        'Portal de clientes',
      ]}
    />
  );
}
