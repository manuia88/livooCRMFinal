import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Calendar } from 'lucide-react';

export default function SocialPlannerPage() {
  return (
    <ModulePlaceholder
      title="Social Planner"
      description="Planifica y programa publicaciones para Facebook e Instagram"
      icon={Calendar}
      features={[
        'Calendario visual',
        'Publicación programada',
        'Multi-cuenta',
        'Biblioteca de contenido',
        'Vista previa de posts',
        'Analítica básica',
      ]}
    />
  );
}
