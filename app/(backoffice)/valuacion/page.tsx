import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { TrendingUp } from 'lucide-react';

export default function ValuacionPage() {
  return (
    <ModulePlaceholder
      title="IA Valuación"
      description="Valuación automática de propiedades con IA y análisis comparativo de mercado"
      icon={TrendingUp}
      features={[
        'Valuación con IA (Gemini)',
        'CMA automático',
        'Análisis de zona',
        'Reportes profesionales',
        'Historial de valuaciones',
        'Exportar PDF',
      ]}
    />
  );
}
