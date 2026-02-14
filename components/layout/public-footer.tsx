import Link from 'next/link';
import { Building2, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

// ============================================================================
// PUBLIC FOOTER NAVIGATION
// ============================================================================

const footerNavigation = {
  propiedades: [
    { name: 'Casas en venta', href: '/buscar?tipo=casa&operacion=venta' },
    { name: 'Departamentos en venta', href: '/buscar?tipo=departamento&operacion=venta' },
    { name: 'Casas en renta', href: '/buscar?tipo=casa&operacion=renta' },
    { name: 'Departamentos en renta', href: '/buscar?tipo=departamento&operacion=renta' },
  ],
  servicios: [
    { name: 'Valuación', href: '/valuacion' },
    { name: 'Desarrollos', href: '/desarrollos' },
    { name: 'Agentes', href: '/agentes' },
    { name: 'Blog', href: '/blog' },
  ],
  empresa: [
    { name: 'Acerca de', href: '/acerca' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Términos y condiciones', href: '/terminos' },
    { name: 'Aviso de privacidad', href: '/privacidad' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ],
};

// ============================================================================
// PUBLIC FOOTER COMPONENT
// ============================================================================

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--text-primary)]">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">
                Livoo
              </span>
            </Link>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">
              Tu plataforma inmobiliaria de confianza. Encuentra la propiedad perfecta
              o gestiona tu portafolio con la tecnología más avanzada.
            </p>
            <div className="mt-6 flex gap-4">
              {footerNavigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Propiedades */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Propiedades
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.propiedades.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Servicios
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.servicios.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Empresa
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t border-[var(--border-default)] pt-8">
          <p className="text-center text-sm text-[var(--text-tertiary)]">
            &copy; {new Date().getFullYear()} Livoo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
