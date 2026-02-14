import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import type { Metadata } from 'next';

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: {
    default: 'Livoo - Tu Plataforma Inmobiliaria',
    template: '%s | Livoo',
  },
  description:
    'Encuentra la propiedad perfecta o gestiona tu portafolio inmobiliario con la tecnología más avanzada.',
  keywords: [
    'inmobiliaria',
    'propiedades',
    'casas',
    'departamentos',
    'venta',
    'renta',
    'bienes raíces',
  ],
};

// ============================================================================
// PUBLIC LAYOUT
// ============================================================================

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
