'use client';

import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Minus, Calendar, TrendingUp, Users, Home, DollarSign } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

// Mock Data
const kpis = [
  { id: 'leads', label: 'Leads Nuevos', value: '147', change: 12, changeType: 'increase', icon: Users },
  { id: 'properties', label: 'Propiedades Activas', value: '89', change: 5, changeType: 'increase', icon: Home },
  { id: 'sales', label: 'Ventas del Mes', value: '$2.4M', change: -3, changeType: 'decrease', icon: TrendingUp },
  { id: 'commission', label: 'Comisión Total', value: '$125K', change: 8, changeType: 'increase', icon: DollarSign },
];

const revenueData = [
  { month: 'Ene', revenue: 180000, target: 200000 },
  { month: 'Feb', revenue: 220000, target: 200000 },
  { month: 'Mar', revenue: 190000, target: 200000 },
  { month: 'Abr', revenue: 240000, target: 250000 },
  { month: 'May', revenue: 280000, target: 250000 },
  { month: 'Jun', revenue: 260000, target: 250000 },
];

const funnelData = [
  { stage: 'Leads', count: 450, fill: '#3B82F6' },
  { stage: 'Contactados', count: 320, fill: '#8B5CF6' },
  { stage: 'Calificados', count: 180, fill: '#EC4899' },
  { stage: 'Visitas', count: 95, fill: '#F59E0B' },
  { stage: 'Propuestas', count: 42, fill: '#10B981' },
  { stage: 'Cierres', count: 18, fill: '#059669' },
];

const leaderboard = [
  { id: 1, name: 'Ana García', sales: 12, commission: 48500, avatar: 'AG' },
  { id: 2, name: 'Carlos Ruiz', sales: 9, commission: 42300, avatar: 'CR' },
  { id: 3, name: 'María López', sales: 8, commission: 38900, avatar: 'ML' },
  { id: 4, name: 'Juan Pérez', sales: 6, commission: 27600, avatar: 'JP' },
  { id: 5, name: 'Sofia Torres', sales: 5, commission: 22100, avatar: 'ST' },
];

const recentActivity = [
  { id: 1, type: 'lead', message: 'Nuevo lead desde Inmuebles24', property: 'Depto Roma Norte', time: '5 min' },
  { id: 2, type: 'visit', message: 'Visita programada', property: 'Casa Polanco', time: '15 min' },
  { id: 3, type: 'sale', message: 'Venta cerrada - $2.8M', property: 'Penthouse Condesa', time: '1 hora' },
  { id: 4, type: 'proposal', message: 'Propuesta enviada', property: 'Loft Centro', time: '2 horas' },
  { id: 5, type: 'lead', message: 'Lead calificado', property: 'Casa San Ángel', time: '3 horas' },
];

const upcomingVisits = [
  { id: 1, property: 'Depto Nápoles', client: 'Roberto Sánchez', time: 'Hoy 14:00', agent: 'Ana García' },
  { id: 2, property: 'Casa Del Valle', client: 'Laura Martínez', time: 'Hoy 16:30', agent: 'Carlos Ruiz' },
  { id: 3, property: 'Loft Roma Sur', client: 'Pedro Gómez', time: 'Mañana 10:00', agent: 'María López' },
  { id: 4, property: 'Penthouse Polanco', client: 'Isabel Fernández', time: 'Mañana 15:00', agent: 'Juan Pérez' },
];

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Visión general de tu negocio inmobiliario"
      />

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
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
                <div className="h-12 w-12 rounded-lg bg-[var(--bg-page)] flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[var(--text-primary)]" />
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
                  <span className="text-[var(--text-tertiary)]">vs mes anterior</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Ingresos Mensuales
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Comparado con meta mensual
          </p>
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="url(#colorRevenue)"
                  name="Ingresos"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  name="Meta"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Funnel Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Embudo de Ventas
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Conversión de leads a cierres
          </p>
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis
                  dataKey="stage"
                  type="category"
                  stroke="#6B7280"
                  width={100}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" name="Cantidad">
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Leaderboard + Activity + Visits */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Leaderboard */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Top Asesores
            </h3>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </div>
          <div className="space-y-4">
            {leaderboard.map((agent, index) => (
              <div key={agent.id} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg-page)] flex items-center justify-center text-sm font-semibold text-[var(--text-primary)]">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {agent.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {agent.sales} ventas · ${(agent.commission / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Actividad Reciente
            </h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div
                  className={`mt-0.5 flex-shrink-0 w-2 h-2 rounded-full ${activity.type === 'sale'
                    ? 'bg-green-500'
                    : activity.type === 'lead'
                      ? 'bg-blue-500'
                      : 'bg-amber-500'
                    }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)]">{activity.message}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {activity.property} · {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Visits */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Próximas Visitas
            </h3>
            <Calendar className="h-5 w-5 text-[var(--text-secondary)]" />
          </div>
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {visit.property}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {visit.client} · {visit.time}
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">
                  Asesor: {visit.agent}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
