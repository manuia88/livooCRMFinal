import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Inbox } from 'lucide-react';

export default function InboxPage() {
  return (
    <ModulePlaceholder
      title="Inbox Unificado"
      description="Centraliza WhatsApp, email, Facebook y formularios en una sola bandeja"
      icon={Inbox}
      features={[
        'WhatsApp Business API',
        'Email integrado',
        'Mensajes de Facebook/Instagram',
        'Formularios web',
        'Respuestas rápidas',
        'Asignación automática',
      ]}
    />
  );
}
