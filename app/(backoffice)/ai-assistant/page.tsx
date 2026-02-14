import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Sparkles } from 'lucide-react';

export default function AIAssistantPage() {
  return (
    <ModulePlaceholder
      title="AI Assistant"
      description="Asistente de IA que ayuda con descripciones, emails, y respuestas automáticas"
      icon={Sparkles}
      features={[
        'Generar descripciones',
        'Escribir emails',
        'Respuestas sugeridas',
        'Resumen de conversaciones',
        'Análisis de sentimiento',
        'Traducción automática',
      ]}
    />
  );
}
