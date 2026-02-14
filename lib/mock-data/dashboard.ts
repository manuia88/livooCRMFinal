import type { DashboardKPI, ActivityFeedItem } from '@/types';

// ============================================================================
// DASHBOARD KPIs
// ============================================================================

export const mockDashboardKPIs: DashboardKPI[] = [
  {
    id: 'kpi-1',
    label: 'Propiedades Activas',
    value: '124',
    change: 12.5,
    changeType: 'increase',
    icon: 'Building2',
  },
  {
    id: 'kpi-2',
    label: 'Leads este mes',
    value: '45',
    change: 8.2,
    changeType: 'increase',
    icon: 'Users',
  },
  {
    id: 'kpi-3',
    label: 'Oportunidades Activas',
    value: '$127.5M',
    change: 15.3,
    changeType: 'increase',
    icon: 'Target',
  },
  {
    id: 'kpi-4',
    label: 'Tasa de Conversión',
    value: '24.8%',
    change: -2.4,
    changeType: 'decrease',
    icon: 'TrendingUp',
  },
  {
    id: 'kpi-5',
    label: 'Visitas Agendadas',
    value: '18',
    change: 0,
    changeType: 'neutral',
    icon: 'Calendar',
  },
  {
    id: 'kpi-6',
    label: 'Health Score Promedio',
    value: '87.3',
    change: 3.1,
    changeType: 'increase',
    icon: 'Activity',
  },
];

// ============================================================================
// ACTIVITY FEED
// ============================================================================

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: 'feed-1',
    type: 'opportunity',
    action: 'actualizó la etapa de',
    description: 'Venta Casa Polanco a "Negociación"',
    user: {
      id: 'agent-1',
      name: 'María García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
    timestamp: '2024-02-13T16:45:00Z',
  },
  {
    id: 'feed-2',
    type: 'property',
    action: 'agregó una nueva propiedad',
    description: 'Casa moderna en Valle Oriente',
    user: {
      id: 'agent-3',
      name: 'Ana Martínez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
    timestamp: '2024-02-13T15:30:00Z',
  },
  {
    id: 'feed-3',
    type: 'contact',
    action: 'calificó el contacto',
    description: 'Miguel Vargas como "Caliente"',
    user: {
      id: 'agent-3',
      name: 'Ana Martínez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
    timestamp: '2024-02-13T14:20:00Z',
  },
  {
    id: 'feed-4',
    type: 'task',
    action: 'completó la tarea',
    description: '"Seguimiento cliente VIP"',
    user: {
      id: 'agent-2',
      name: 'Carlos Rodríguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    },
    timestamp: '2024-02-13T13:15:00Z',
  },
  {
    id: 'feed-5',
    type: 'opportunity',
    action: 'cerró una venta',
    description: 'Penthouse Roma Norte - $18M MXN',
    user: {
      id: 'agent-1',
      name: 'María García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
    timestamp: '2024-02-13T12:00:00Z',
  },
  {
    id: 'feed-6',
    type: 'contact',
    action: 'agregó un nuevo contacto',
    description: 'Jorge Flores (Lead web)',
    user: {
      id: 'agent-2',
      name: 'Carlos Rodríguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    },
    timestamp: '2024-02-13T11:30:00Z',
  },
  {
    id: 'feed-7',
    type: 'property',
    action: 'actualizó el precio de',
    description: 'Departamento Condesa (reducción 5%)',
    user: {
      id: 'agent-1',
      name: 'María García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
    timestamp: '2024-02-13T10:45:00Z',
  },
  {
    id: 'feed-8',
    type: 'task',
    action: 'creó una tarea urgente',
    description: '"Preparar contrato oficina Santa Fe"',
    user: {
      id: 'agent-4',
      name: 'Luis Hernández',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
    },
    timestamp: '2024-02-13T09:15:00Z',
  },
];

// ============================================================================
// FUNNEL DATA
// ============================================================================

export const mockFunnelData = [
  { stage: 'Leads', value: 150, percentage: 100 },
  { stage: 'Calificados', value: 89, percentage: 59 },
  { stage: 'Presentación', value: 56, percentage: 37 },
  { stage: 'Visita', value: 34, percentage: 23 },
  { stage: 'Propuesta', value: 21, percentage: 14 },
  { stage: 'Negociación', value: 13, percentage: 9 },
  { stage: 'Cierre', value: 8, percentage: 5 },
];

// ============================================================================
// CHART DATA - Revenue by Month
// ============================================================================

export const mockRevenueData = [
  { month: 'Ago', value: 125000000 },
  { month: 'Sep', value: 143000000 },
  { month: 'Oct', value: 138000000 },
  { month: 'Nov', value: 167000000 },
  { month: 'Dic', value: 189000000 },
  { month: 'Ene', value: 198000000 },
  { month: 'Feb', value: 215000000 },
];

// ============================================================================
// CHART DATA - Properties by Type
// ============================================================================

export const mockPropertiesByType = [
  { name: 'Casas', value: 45, fill: '#111827' },
  { name: 'Departamentos', value: 58, fill: '#374151' },
  { name: 'Terrenos', value: 12, fill: '#6B7280' },
  { name: 'Oficinas', value: 15, fill: '#9CA3AF' },
  { name: 'Locales', value: 8, fill: '#D1D5DB' },
];

// ============================================================================
// CHART DATA - Lead Sources
// ============================================================================

export const mockLeadSources = [
  { name: 'Web', value: 35, fill: '#111827' },
  { name: 'Facebook', value: 28, fill: '#374151' },
  { name: 'Instagram', value: 22, fill: '#6B7280' },
  { name: 'Google', value: 18, fill: '#9CA3AF' },
  { name: 'Referidos', value: 15, fill: '#D1D5DB' },
  { name: 'Otros', value: 12, fill: '#E5E7EB' },
];

// ============================================================================
// TOP PERFORMING AGENTS
// ============================================================================

export const mockTopAgents = [
  {
    id: 'agent-1',
    name: 'María García',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    deals: 12,
    revenue: 78500000,
    conversionRate: 28.5,
  },
  {
    id: 'agent-3',
    name: 'Ana Martínez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    deals: 10,
    revenue: 65200000,
    conversionRate: 26.8,
  },
  {
    id: 'agent-2',
    name: 'Carlos Rodríguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    deals: 8,
    revenue: 52300000,
    conversionRate: 24.2,
  },
  {
    id: 'agent-4',
    name: 'Luis Hernández',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
    deals: 7,
    revenue: 41600000,
    conversionRate: 22.1,
  },
];
