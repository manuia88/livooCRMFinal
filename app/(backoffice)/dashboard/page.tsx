import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { mockDashboardKPIs } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Visión general de tu negocio inmobiliario"
      />

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDashboardKPIs.map((kpi) => (
          <Card key={kpi.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">
                  {kpi.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
                  {kpi.value}
                </p>
              </div>
            </div>
            {kpi.change !== 0 && (
              <div className="mt-4 flex items-center gap-1 text-sm">
                {kpi.changeType === 'increase' && (
                  <>
                    <ArrowUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">
                      {kpi.change}%
                    </span>
                  </>
                )}
                {kpi.changeType === 'decrease' && (
                  <>
                    <ArrowDown className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-600">
                      {kpi.change}%
                    </span>
                  </>
                )}
                {kpi.changeType === 'neutral' && (
                  <>
                    <Minus className="h-4 w-4 text-[var(--text-tertiary)]" />
                    <span className="font-medium text-[var(--text-tertiary)]">
                      Sin cambios
                    </span>
                  </>
                )}
                <span className="text-[var(--text-tertiary)]">vs mes anterior</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Placeholder for charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Embudo de Ventas
          </h3>
          <div className="mt-4 flex h-[300px] items-center justify-center text-[var(--text-tertiary)]">
            Gráfico de embudo próximamente
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Ingresos por Mes
          </h3>
          <div className="mt-4 flex h-[300px] items-center justify-center text-[var(--text-tertiary)]">
            Gráfico de ingresos próximamente
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
