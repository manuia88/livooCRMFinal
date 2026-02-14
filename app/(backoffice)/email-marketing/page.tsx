import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Mail } from 'lucide-react';

export default function EmailMarketingPage() {
  return (
    <ModulePlaceholder
      title="Email Marketing"
      description="Campañas de email con editor drag & drop y automatizaciones"
      icon={Mail}
      features={[
        'Editor drag & drop',
        'Plantillas responsive',
        'A/B Testing',
        'Segmentación avanzada',
        'Métricas de apertura/clicks',
        'Integración con Resend',
      ]}
    />
  );
}
