'use client';

import { useState } from 'react';
import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, Calendar } from 'lucide-react';

import PeriodComparison from '@/components/analytics/PeriodComparison';
import ConversionFunnel from '@/components/analytics/ConversionFunnel';
import PropertyPerformance from '@/components/analytics/PropertyPerformance';
import AgentMetrics from '@/components/analytics/AgentMetrics';
import RevenueBreakdown from '@/components/analytics/RevenueBreakdown';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageContainer>
      <PageHeader
        title="Analytics 2.0"
        description="Analítica ejecutiva con métricas avanzadas y comparativas"
        icon={BarChart3}
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Últimos 30 días
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </PageHeader>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">General</TabsTrigger>
          <TabsTrigger value="conversions">Conversiones</TabsTrigger>
          <TabsTrigger value="properties">Propiedades</TabsTrigger>
          <TabsTrigger value="agents">Asesores</TabsTrigger>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <PeriodComparison />

          <div className="grid gap-6 lg:grid-cols-2">
            <ConversionFunnel />
            <div className="space-y-6">
              <RevenueBreakdown />
            </div>
          </div>

          <PropertyPerformance />
        </TabsContent>

        {/* Conversions Tab */}
        <TabsContent value="conversions" className="space-y-6">
          <ConversionFunnel />
          <div className="grid gap-6 lg:grid-cols-2">
            <PropertyPerformance />
          </div>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-6">
          <PropertyPerformance />
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <AgentMetrics />
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <PeriodComparison />
          <RevenueBreakdown />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
