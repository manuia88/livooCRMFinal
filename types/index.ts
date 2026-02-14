// ============================================================================
// CENTRAL TYPE EXPORTS
// ============================================================================

// Property types
export type {
  PropertyType,
  OperationType,
  PropertyStatus,
  Currency,
  Address,
  Agent,
  Property,
  PropertyFilters,
  PropertyStats,
} from './property';

// Contact types
export type {
  ContactType,
  ContactStatus,
  LeadSource,
  LeadScore,
  Contact,
  ContactActivity,
  ContactStats,
} from './contact';

// Opportunity types
export type {
  OpportunityStage,
  OpportunityType,
  OpportunityPriority,
  Opportunity,
  OpportunityActivity,
  OpportunityStats,
  PipelineStage,
} from './opportunity';

// Task types
export type {
  TaskType,
  TaskStatus,
  TaskPriority,
  Task,
  TaskStats,
} from './task';

// ============================================================================
// SHARED TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'gerente' | 'coordinador' | 'agente';
  createdAt: string;
}

export interface DashboardKPI {
  id: string;
  label: string;
  value: number | string;
  change: number; // percentage
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
}

export interface ActivityFeedItem {
  id: string;
  type: 'property' | 'contact' | 'opportunity' | 'task';
  action: string;
  description: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
