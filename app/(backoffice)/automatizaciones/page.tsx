'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Zap,
  Target,
  Clock,
  Cake,
  Home,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { workflowTemplates } from '@/lib/automation/workflowTemplates';

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: string;
    label: string;
  };
  status: 'active' | 'paused' | 'draft';
  stats: {
    totalExecutions: number;
    successRate: number;
    lastRun?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Follow-up 48h después de lead',
    description: 'Envía mensaje automatizado 48h después de recibir un nuevo lead sin contacto',
    trigger: {
      type: 'new_lead',
      label: 'Nuevo Lead',
    },
    status: 'active',
    stats: {
      totalExecutions: 127,
      successRate: 94,
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'wf-2',
    name: 'Felicitación cumpleaños cliente',
    description: 'Envía felicitación automática el día del cumpleaños del cliente',
    trigger: {
      type: 'birthday',
      label: 'Cumpleaños Cliente',
    },
    status: 'active',
    stats: {
      totalExecutions: 43,
      successRate: 100,
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05'),
  },
];

const triggerIcons = {
  new_lead: Target,
  stage_change: Zap,
  time_based: Clock,
  birthday: Cake,
  new_property: Home,
  custom: Calendar,
};

export default function AutomatizacionesPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [showTemplates, setShowTemplates] = useState(false);

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) =>
        wf.id === id
          ? { ...wf, status: wf.status === 'active' ? 'paused' : 'active' }
          : wf
      )
    );
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Hace menos de 1h';
    if (hours < 24) return `Hace ${hours}h`;
    if (days === 1) return 'Hace 1 día';
    return `Hace ${days} días`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Automatizaciones
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Crea flujos de trabajo automatizados para optimizar tus procesos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowTemplates(!showTemplates)}
          >
            <Zap className="h-4 w-4 mr-2" />
            {showTemplates ? 'Ver Workflows' : 'Ver Plantillas'}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Automatización
          </Button>
        </div>
      </div>

      {/* Templates Gallery */}
      {showTemplates && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Plantillas Pre-configuradas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflowTemplates.map((template) => {
              const TriggerIcon = triggerIcons[template.trigger.type as keyof typeof triggerIcons] || Target;
              return (
                <Card key={template.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-[var(--primary)]/10 p-2 rounded">
                      <TriggerIcon className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                        {template.name}
                      </h3>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {template.trigger.label}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-4">
                    {template.description}
                  </p>
                  <Button size="sm" className="w-full">
                    Usar Plantilla
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Workflows List */}
      {!showTemplates && (
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Mis Automatizaciones
          </h2>
          <div className="space-y-4">
            {workflows.map((workflow) => {
              const TriggerIcon =
                triggerIcons[workflow.trigger.type as keyof typeof triggerIcons] || Target;

              return (
                <Card key={workflow.id} className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-[var(--primary)]/10 p-3 rounded-lg">
                        <TriggerIcon className="h-6 w-6 text-[var(--primary)]" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                            {workflow.name}
                          </h3>
                          <Badge
                            variant={
                              workflow.status === 'active'
                                ? 'default'
                                : workflow.status === 'paused'
                                  ? 'secondary'
                                  : 'outline'
                            }
                          >
                            {workflow.status === 'active'
                              ? 'Activa'
                              : workflow.status === 'paused'
                                ? 'Pausada'
                                : 'Borrador'}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                          {workflow.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-[var(--text-secondary)]">Trigger:</span>
                            <span className="ml-2 font-medium text-[var(--text-primary)]">
                              {workflow.trigger.label}
                            </span>
                          </div>
                          <div>
                            <span className="text-[var(--text-secondary)]">Ejecuciones:</span>
                            <span className="ml-2 font-medium text-[var(--text-primary)]">
                              {workflow.stats.totalExecutions.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[var(--text-secondary)]">Éxito:</span>
                            <span className="ml-2 font-medium text-green-600">
                              {workflow.stats.successRate}%
                            </span>
                          </div>
                          {workflow.stats.lastRun && (
                            <div>
                              <span className="text-[var(--text-secondary)]">Última vez:</span>
                              <span className="ml-2 font-medium text-[var(--text-primary)]">
                                {formatRelativeTime(workflow.stats.lastRun)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={workflow.status === 'active' ? 'destructive' : 'default'}
                        onClick={() => toggleWorkflowStatus(workflow.id)}
                      >
                        {workflow.status === 'active' ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Activar
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
