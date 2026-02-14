import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Package } from 'lucide-react';

export default function InventarioPage() {
  return (
    <ModulePlaceholder
      title="Inventario"
      description="Vista consolidada de todo tu stock inmobiliario con análisis y métricas"
      icon={Package}
      features={[
        'Dashboard de stock por zona',
        'Análisis de rotación',
        'Propiedades estancadas',
        'Valorización de portafolio',
        'Reportes de inventario',
        'Proyecciones de venta',
      ]}
    />
  );
}
