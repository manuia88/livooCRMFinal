import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
}

export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
  features = [],
}: ModulePlaceholderProps) {
  return (
    <PageContainer>
      <PageHeader title={title} description={description} />

      <Card className="p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-page)]">
            <Icon className="h-8 w-8 text-[var(--text-primary)]" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-[var(--text-secondary)]">
            {description}
          </p>

          {features.length > 0 && (
            <div className="mt-8 w-full max-w-2xl">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                Funcionalidades planificadas
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg border border-[var(--border-default)] bg-white p-3 text-left"
                  >
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-primary)]" />
                    <span className="text-sm text-[var(--text-secondary)]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 text-sm text-[var(--text-tertiary)]">
            Módulo en desarrollo - Próximamente
          </p>
        </div>
      </Card>
    </PageContainer>
  );
}
