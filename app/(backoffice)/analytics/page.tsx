import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <ModulePlaceholder
      title="Analytics 2.0"
      description="Analítica avanzada con dashboards personalizables y métricas en tiempo real"
      icon={BarChart3}
      features={[
        'Dashboards personalizables',
        'Métricas en tiempo real',
        'Reportes exportables',
        'Comparativas por período',
        'Análisis de conversión',
        'KPIs por agente',
      ]}
    />
  );
}
