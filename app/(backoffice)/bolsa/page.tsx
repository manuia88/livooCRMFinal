import { ModulePlaceholder } from '@/components/layout/module-placeholder';
import { Share2 } from 'lucide-react';

export default function BolsaPage() {
  return (
    <ModulePlaceholder
      title="Bolsa Inmobiliaria"
      description="Comparte y recibe propiedades de otros brokers. Estilo MLS colaborativo"
      icon={Share2}
      features={[
        'Publicar en bolsa',
        'Búsqueda de propiedades compartidas',
        'Solicitudes de colaboración',
        'Comisiones compartidas',
        'Red de brokers',
        'Sistema de reputación',
      ]}
    />
  );
}
