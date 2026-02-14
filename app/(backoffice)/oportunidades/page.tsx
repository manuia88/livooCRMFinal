'use client';

import { useState } from 'react';
import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, DollarSign, Calendar, User, Building2, MoreVertical } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Pipeline stages
const stages = [
  { id: 'nuevo', label: 'Lead Nuevo', color: 'bg-blue-500' },
  { id: 'contactado', label: 'Contactado', color: 'bg-purple-500' },
  { id: 'calificado', label: 'Calificado', color: 'bg-indigo-500' },
  { id: 'visita-agendada', label: 'Visita Agendada', color: 'bg-cyan-500' },
  { id: 'visita-realizada', label: 'Visita Realizada', color: 'bg-teal-500' },
  { id: 'propuesta', label: 'Propuesta Enviada', color: 'bg-amber-500' },
  { id: 'negociacion', label: 'Negociación', color: 'bg-orange-500' },
  { id: 'contrato', label: 'Contrato', color: 'bg-lime-500' },
  { id: 'apartado', label: 'Apartado', color: 'bg-green-500' },
  { id: 'tramite', label: 'Trámite', color: 'bg-emerald-500' },
  { id: 'cierre', label: 'Cierre', color: 'bg-green-600' },
  { id: 'post-venta', label: 'Post-venta', color: 'bg-gray-500' },
];

// Mock opportunities
const initialOpportunities = [
  {
    id: '1',
    title: 'Penthouse Roma Norte',
    contact: 'Roberto Sánchez',
    value: 8500000,
    currency: 'MXN',
    probability: 85,
    expectedClose: '2026-03-15',
    stage: 'negociacion',
    agent: 'Ana García',
    property: 'Penthouse 3 rec',
  },
  {
    id: '2',
    title: 'Casa Polanco',
    contact: 'Laura Martínez',
    value: 12000000,
    currency: 'MXN',
    probability: 60,
    expectedClose: '2026-04-20',
    stage: 'visita-realizada',
    agent: 'Carlos Ruiz',
    property: 'Casa 4 rec',
  },
  {
    id: '3',
    title: 'Depto Condesa',
    contact: 'Pedro Gómez',
    value: 4500000,
    currency: 'MXN',
    probability: 40,
    expectedClose: '2026-05-10',
    stage: 'calificado',
    agent: 'María López',
    property: 'Depto 2 rec',
  },
  {
    id: '4',
    title: 'Loft Centro',
    contact: 'Isabel Fernández',
    value: 6800000,
    currency: 'MXN',
    probability: 90,
    expectedClose: '2026-03-01',
    stage: 'apartado',
    agent: 'Ana García',
    property: 'Loft 1 rec',
  },
  {
    id: '5',
    title: 'Casa Del Valle',
    contact: 'Miguel Torres',
    value: 5200000,
    currency: 'MXN',
    probability: 30,
    expectedClose: '2026-06-15',
    stage: 'contactado',
    agent: 'Juan Pérez',
    property: 'Casa 3 rec',
  },
];

interface Opportunity {
  id: string;
  title: string;
  contact: string;
  value: number;
  currency: string;
  probability: number;
  expectedClose: string;
  stage: string;
  agent: string;
  property: string;
}

function SortableOpportunity({ opportunity }: { opportunity: Opportunity }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: opportunity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3"
    >
      <Card className="p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm text-[var(--text-primary)] line-clamp-1">
            {opportunity.title}
          </h4>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
            <MoreVertical className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <User className="h-3 w-3" />
            <span>{opportunity.contact}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <Building2 className="h-3 w-3" />
            <span>{opportunity.property}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-1 text-sm font-bold text-[var(--text-primary)]">
              <DollarSign className="h-4 w-4" />
              {(opportunity.value / 1000000).toFixed(1)}M
            </div>
            <Badge variant="outline" className="text-xs">
              {opportunity.probability}%
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
            <Calendar className="h-3 w-3" />
            <span>{new Date(opportunity.expectedClose).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function OportunidadesPage() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the stage of the dragged opportunity
    const activeOpp = opportunities.find((o) => o.id === activeId);
    if (!activeOpp) return;

    // Check if we're dropping over a stage column
    const overStage = stages.find((s) => s.id === overId);
    if (overStage && activeOpp.stage !== overStage.id) {
      setOpportunities((opps) =>
        opps.map((opp) =>
          opp.id === activeId ? { ...opp, stage: overStage.id } : opp
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  const getOpportunitiesByStage = (stageId: string) => {
    return opportunities.filter((opp) => opp.stage === stageId);
  };

  const getTotalByStage = (stageId: string) => {
    return opportunities
      .filter((opp) => opp.stage === stageId)
      .reduce((sum, opp) => sum + opp.value, 0);
  };

  const activeOpportunity = opportunities.find((opp) => opp.id === activeId);

  return (
    <PageContainer>
      <PageHeader
        title="Oportunidades"
        description={`${opportunities.length} oportunidades · $${(opportunities.reduce((sum, opp) => sum + opp.value, 0) / 1000000).toFixed(1)}M en pipeline`}
        actions={
          <>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Oportunidad
            </Button>
          </>
        }
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minWidth: '100%' }}>
            {stages.map((stage) => {
              const stageOpps = getOpportunitiesByStage(stage.id);
              const stageTotal = getTotalByStage(stage.id);

              return (
                <div key={stage.id} className="flex-shrink-0 w-[280px]">
                  <Card className="h-full">
                    {/* Stage Header */}
                    <div className={`${stage.color} text-white p-3 rounded-t-lg`}>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm">{stage.label}</h3>
                        <Badge className="bg-white/20 text-white border-0">
                          {stageOpps.length}
                        </Badge>
                      </div>
                      <p className="text-xs opacity-90">
                        ${(stageTotal / 1000000).toFixed(1)}M
                      </p>
                    </div>

                    {/* Droppable Zone */}
                    <div
                      className="p-3 min-h-[400px]"
                      id={stage.id}
                    >
                      <SortableContext
                        items={stageOpps.map((o) => o.id)}
                        strategy={verticalListSortingStrategy}
                        id={stage.id}
                      >
                        {stageOpps.map((opportunity) => (
                          <SortableOpportunity
                            key={opportunity.id}
                            opportunity={opportunity}
                          />
                        ))}
                      </SortableContext>

                      {stageOpps.length === 0 && (
                        <div className="text-center py-8 text-[var(--text-tertiary)] text-sm">
                          Arrastra aquí
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <DragOverlay>
          {activeOpportunity ? (
            <Card className="p-4 w-[280px] shadow-xl rotate-3">
              <h4 className="font-semibold text-sm text-[var(--text-primary)]">
                {activeOpportunity.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {activeOpportunity.contact}
              </p>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </PageContainer>
  );
}
