'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// ============================================================================
// PUBLIC HEADER NAVIGATION
// ============================================================================

const navigation = [
  { label: 'Propiedades', href: '/buscar' },
  { label: 'Desarrollos', href: '/desarrollos' },
  { label: 'Agentes', href: '/agentes' },
  { label: 'Valuación', href: '/valuacion' },
];

// ============================================================================
// PUBLIC HEADER COMPONENT
// ============================================================================

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--text-primary)]">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)]">
            Livoo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Acceder</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Comenzar gratis</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 border-t border-[var(--border-default)] px-4 pb-3 pt-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-[var(--bg-page)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-page)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4 space-y-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/dashboard">Acceder</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/dashboard">Comenzar gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
