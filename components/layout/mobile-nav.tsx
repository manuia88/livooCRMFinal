'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  Target,
  Inbox,
  CheckSquare,
  Send,
  Mail,
  Calendar,
  Megaphone,
  Workflow,
  TrendingUp,
  Sparkles,
  BarChart3,
  Home,
  Share2,
  FileText,
  Settings,
  UserCircle,
} from 'lucide-react';

// ============================================================================
// NAVIGATION CONFIGURATION (same as Sidebar)
// ============================================================================

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    id: 'core',
    label: 'CORE CRM',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { id: 'propiedades', label: 'Propiedades', href: '/propiedades', icon: Building2 },
      { id: 'captaciones', label: 'Captaciones', href: '/captaciones', icon: ClipboardList },
      { id: 'inventario', label: 'Inventario', href: '/inventario', icon: Package },
      { id: 'contactos', label: 'Contactos 2.0', href: '/contactos', icon: Users },
      { id: 'oportunidades', label: 'Oportunidades', href: '/oportunidades', icon: Target },
    ],
  },
  {
    id: 'comunicacion',
    label: 'COMUNICACIÓN',
    items: [
      { id: 'inbox', label: 'Inbox Unificado', href: '/inbox', icon: Inbox },
      { id: 'tareas', label: 'Tareas 2.0', href: '/tareas', icon: CheckSquare },
      { id: 'broadcast', label: 'Broadcast', href: '/broadcast', icon: Send },
      { id: 'email-marketing', label: 'Email Marketing', href: '/email-marketing', icon: Mail },
      { id: 'social-planner', label: 'Social Planner', href: '/social-planner', icon: Calendar },
      { id: 'campanas', label: 'Campañas Ads', href: '/campanas', icon: Megaphone },
    ],
  },
  {
    id: 'inteligencia',
    label: 'INTELIGENCIA',
    items: [
      { id: 'automatizaciones', label: 'Automatizaciones', href: '/automatizaciones', icon: Workflow },
      { id: 'valuacion', label: 'IA Valuación', href: '/valuacion', icon: TrendingUp },
      { id: 'ai-assistant', label: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
      { id: 'analytics', label: 'Analytics 2.0', href: '/analytics', icon: BarChart3 },
    ],
  },
  {
    id: 'plataforma',
    label: 'PLATAFORMA',
    items: [
      { id: 'desarrollos', label: 'Desarrollos', href: '/desarrollos', icon: Home },
      { id: 'bolsa', label: 'Bolsa Inmobiliaria', href: '/bolsa', icon: Share2 },
      { id: 'reportes', label: 'Reportes 2.0', href: '/reportes', icon: FileText },
      { id: 'config', label: 'Configuración', href: '/config', icon: Settings },
      { id: 'propietarios', label: 'Propietarios', href: '/propietarios', icon: UserCircle },
    ],
  },
];

// ============================================================================
// MOBILE NAV COMPONENT
// ============================================================================

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--border-default)] bg-white lg:hidden">
        <div className="flex h-full items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--text-primary)]">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              Livoo CRM
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <aside className="fixed left-0 top-16 bottom-0 z-50 w-[280px] overflow-y-auto border-r border-[var(--border-default)] bg-white lg:hidden">
            <nav className="p-4">
              <div className="space-y-6">
                {navigation.map((group) => (
                  <div key={group.id}>
                    {/* Group Label */}
                    <div className="mb-2 px-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                        {group.label}
                      </h3>
                    </div>

                    {/* Group Items */}
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                              isActive
                                ? 'bg-[var(--text-primary)] text-white'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-page)] hover:text-[var(--text-primary)]'
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
