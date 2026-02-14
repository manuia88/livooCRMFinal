import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Send } from 'lucide-react';

export default function BroadcastPage() {
  return (
    <ModulePlaceholder
      title="Broadcast WhatsApp"
      description="Envío masivo de mensajes de WhatsApp con segmentación inteligente"
      icon={Send}
      features={[
        'Segmentación de contactos',
        'Plantillas de mensajes',
        'Envío programado',
        'Métricas de entrega',
        'Respuestas automáticas',
        'Compliance GDPR',
      ]}
    />
  );
}
