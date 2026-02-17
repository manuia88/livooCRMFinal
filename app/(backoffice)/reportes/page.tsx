'use client';

import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { FileText, FileBarChart, Home, TrendingUp, Clock } from 'lucide-react';
import ReportCard from '@/components/reports/ReportCard';
import { Card } from '@/components/ui/card';

// Mock recent reports
const recentReports = [
  {
    id: 1,
    type: 'CMA',
    name: 'Casa Polanco - Insurgentes 450',
    date: '2 días',
    icon: FileBarChart,
  },
  {
    id: 2,
    type: 'Mercado',
    name: 'Benito Juárez Q4 2025',
    date: '4 días',
    icon: TrendingUp,
  },
  {
    id: 3,
    type: 'Propiedad',
    name: 'Departamento Roma Norte',
    date: '1 semana',
    icon: Home,
  },
];

export default function ReportesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Reportes 2.0"
        description="Genera reportes profesionales para clientes y análisis de mercado"
        icon={FileText}
      />

      {/* Report Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <ReportCard
          title="CMA (Análisis Comparativo)"
          description="Gener análisis de mercado con propiedades comparables y valuación estimada"
          icon={FileBarChart}
          href="/reportes/cma/nuevo"
          recentCount={2}
        />

        <ReportCard
          title="Reporte de Mercado"
          description="Estadísticas y tendencias de un área específica con gráficos y análisis"
          icon={TrendingUp}
          href="/reportes/mercado/nuevo"
          recentCount={1}
        />

        <ReportCard
          title="Reporte de Propiedad"
          description="Presentación profesional de propiedad para clientes con fotos y detalles"
          icon={Home}
          href="/reportes/propiedad"
          recentCount={3}
        />

        <ReportCard
          title="Reporte de Ventas"
          description="Análisis de desempeño por período con métricas y comparativas"
          icon={FileText}
          href="/reportes/ventas/nuevo"
          recentCount={0}
        />
      </div>

      {/* Recent Reports */}
      <Card className="p-6 mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Reportes Recientes</h3>
        </div>

        <div className="space-y-3">
          {recentReports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-600">{report.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Hace {report.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        {recentReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No hay reportes recientes</p>
            <p className="text-sm text-gray-500 mt-1">
              Los reportes generados aparecerán aquí
            </p>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
