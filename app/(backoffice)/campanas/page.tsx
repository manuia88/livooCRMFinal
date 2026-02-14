import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Megaphone } from 'lucide-react';

export default function CampanasPage() {
  return (
    <ModulePlaceholder
      title="Campañas Ads"
      description="Gestiona tus campañas de Facebook Ads y Google Ads desde un solo lugar"
      icon={Megaphone}
      features={[
        'Dashboard unificado',
        'Creación de campañas',
        'Tracking de conversiones',
        'ROI por campaña',
        'Reportes automáticos',
        'Presupuestos y límites',
      ]}
    />
  );
}
