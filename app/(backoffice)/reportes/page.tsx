import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { FileText } from 'lucide-react';

export default function ReportesPage() {
  return (
    <ModulePlaceholder
      title="Reportes 2.0"
      description="Generación de reportes profesionales: CMA, propietario, ventas, etc."
      icon={FileText}
      features={[
        'CMA (Análisis comparativo)',
        'Reporte de propietario',
        'Reporte de ventas',
        'Estado de cuenta',
        'Plantillas personalizables',
        'Exportar a PDF',
      ]}
    />
  );
}
