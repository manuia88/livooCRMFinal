'use client';

import { useState } from 'react';
import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Plus,
  Calendar,
  List,
  LayoutGrid,
  Filter,
  Clock,
  Flag,
  User,
  Building2,
  CheckCircle2,
  Circle,
  AlertCircle,
} from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

type Priority = 'P1' | 'P2' | 'P3' | 'P4';
type ViewMode = 'list' | 'calendar' | 'kanban';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  assignedTo: string;
  linkedTo?: {
    type: 'contact' | 'property' | 'opportunity';
    name: string;
  };
  tags: string[];
  recurring?: 'daily' | 'weekly' | 'monthly';
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Llamar a Roberto Sánchez',
    description: 'Seguimiento de propuesta para Penthouse',
    priority: 'P1',
    dueDate: new Date(),
    completed: false,
    assignedTo: 'Ana García',
    linkedTo: { type: 'contact', name: 'Roberto Sánchez' },
    tags: ['Seguimiento', 'Urgente'],
  },
  {
    id: '2',
    title: 'Visita Casa Polanco',
    description: 'Agendar visita con Laura Martínez',
    priority: 'P2',
    dueDate: addDays(new Date(), 1),
    completed: false,
    assignedTo: 'Carlos Ruiz',
    linkedTo: { type: 'property', name: 'Casa Polanco' },
    tags: ['Visita'],
  },
  {
    id: '3',
    title: 'Enviar documentos de Loft Centro',
    description: 'Escrituras y predial',
    priority: 'P1',
    dueDate: new Date(),
    completed: true,
    assignedTo: 'María López',
    linkedTo: { type: 'property', name: 'Loft Centro' },
    tags: ['Documentos'],
  },
  {
    id: '4',
    title: 'Actualizar fotos Depto Condesa',
    description: 'Contratar fotógrafo profesional',
    priority: 'P3',
    dueDate: addDays(new Date(), 3),
    completed: false,
    assignedTo: 'Juan Pérez',
    linkedTo: { type: 'property', name: 'Depto Condesa' },
    tags: ['Marketing'],
  },
  {
    id: '5',
    title: 'Seguimiento mensual clientes',
    description: 'Llamada de cortesía a clientes activos',
    priority: 'P4',
    dueDate: addDays(new Date(), 7),
    completed: false,
    assignedTo: 'Ana García',
    tags: ['Rutina'],
    recurring: 'monthly',
  },
];

function getPriorityColor(priority: Priority) {
  const colors = {
    P1: 'bg-red-100 text-red-700 border-red-200',
    P2: 'bg-orange-100 text-orange-700 border-orange-200',
    P3: 'bg-blue-100 text-blue-700 border-blue-200',
    P4: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return colors[priority];
}

function getPriorityIcon(priority: Priority) {
  if (priority === 'P1') return <AlertCircle className="h-3.5 w-3.5" />;
  if (priority === 'P2') return <Flag className="h-3.5 w-3.5" />;
  return <Flag className="h-3.5 w-3.5" />;
}

export default function TareasPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showCompleted, setShowCompleted] = useState(true);

  const toggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed);

  const todayTasks = filteredTasks.filter((task) =>
    isSameDay(task.dueDate, new Date())
  );
  const upcomingTasks = filteredTasks.filter(
    (task) => task.dueDate > new Date() && !isSameDay(task.dueDate, new Date())
  );
  const overdueTasks = filteredTasks.filter(
    (task) => task.dueDate < new Date() && !task.completed
  );

  return (
    <PageContainer>
      <PageHeader
        title="Tareas 2.0"
        description={`${filteredTasks.filter((t) => !t.completed).length} tareas pendientes · ${overdueTasks.length} vencidas`}
        actions={
          <>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('kanban')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('calendar')}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Button>
          </>
        }
      />

      {/* Filter Bar */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={showCompleted}
              onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
            />
            <span className="text-sm text-[var(--text-secondary)]">
              Mostrar completadas
            </span>
          </label>
          <div className="flex gap-2 ml-auto">
            <Badge variant="outline" className="bg-red-50">
              P1: {filteredTasks.filter((t) => t.priority === 'P1').length}
            </Badge>
            <Badge variant="outline" className="bg-orange-50">
              P2: {filteredTasks.filter((t) => t.priority === 'P2').length}
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              P3: {filteredTasks.filter((t) => t.priority === 'P3').length}
            </Badge>
            <Badge variant="outline" className="bg-gray-50">
              P4: {filteredTasks.filter((t) => t.priority === 'P4').length}
            </Badge>
          </div>
        </div>
      </Card>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Overdue Tasks */}
          {overdueTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Vencidas ({overdueTasks.length})
              </h3>
              <div className="space-y-2">
                {overdueTasks.map((task) => (
                  <Card key={task.id} className="p-4 border-l-4 border-l-red-500">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskComplete(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4
                              className={`font-medium text-[var(--text-primary)] ${task.completed ? 'line-through opacity-60' : ''
                                }`}
                            >
                              {task.title}
                            </h4>
                            <p className="text-sm text-[var(--text-secondary)] mt-1">
                              {task.description}
                            </p>
                          </div>
                          <Badge
                            className={`${getPriorityColor(task.priority)} flex items-center gap-1 flex-shrink-0`}
                          >
                            {getPriorityIcon(task.priority)}
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(task.dueDate, 'dd MMM', { locale: es })}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {task.assignedTo}
                          </div>
                          {task.linkedTo && (
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {task.linkedTo.name}
                            </div>
                          )}
                          {task.recurring && (
                            <Badge variant="outline" className="text-xs">
                              ↻ {task.recurring}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Today Tasks */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Hoy ({todayTasks.length})
            </h3>
            <div className="space-y-2">
              {todayTasks.map((task) => (
                <Card key={task.id} className={`p-4 ${task.completed ? 'bg-[var(--bg-page)]' : ''}`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskComplete(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4
                            className={`font-medium text-[var(--text-primary)] ${task.completed ? 'line-through opacity-60' : ''
                              }`}
                          >
                            {task.title}
                          </h4>
                          <p className="text-sm text-[var(--text-secondary)] mt-1">
                            {task.description}
                          </p>
                        </div>
                        <Badge
                          className={`${getPriorityColor(task.priority)} flex items-center gap-1 flex-shrink-0`}
                        >
                          {getPriorityIcon(task.priority)}
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {task.assignedTo}
                        </div>
                        {task.linkedTo && (
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {task.linkedTo.name}
                          </div>
                        )}
                        <div className="flex gap-1">
                          {task.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Próximas ({upcomingTasks.length})
              </h3>
              <div className="space-y-2">
                {upcomingTasks.map((task) => (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskComplete(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium text-[var(--text-primary)]">
                              {task.title}
                            </h4>
                            <p className="text-sm text-[var(--text-secondary)] mt-1">
                              {task.description}
                            </p>
                          </div>
                          <Badge
                            className={`${getPriorityColor(task.priority)} flex items-center gap-1 flex-shrink-0`}
                          >
                            {getPriorityIcon(task.priority)}
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(task.dueDate, 'dd MMM', { locale: es })}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {task.assignedTo}
                          </div>
                          {task.linkedTo && (
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {task.linkedTo.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(['P1', 'P2', 'P3', 'P4'] as Priority[]).map((priority) => (
            <Card key={priority} className="p-4">
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${getPriorityColor(priority)} px-3 py-1.5 rounded-lg`}>
                {getPriorityIcon(priority)}
                {priority}
                <Badge variant="outline" className="ml-auto bg-white">
                  {filteredTasks.filter((t) => t.priority === priority).length}
                </Badge>
              </h3>
              <div className="space-y-2">
                {filteredTasks
                  .filter((task) => task.priority === priority)
                  .map((task) => (
                    <Card key={task.id} className="p-3 border">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskComplete(task.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-sm font-medium ${task.completed ? 'line-through opacity-60' : ''
                              }`}
                          >
                            {task.title}
                          </h4>
                          <p className="text-xs text-[var(--text-tertiary)] mt-1">
                            {format(task.dueDate, 'dd MMM', { locale: es })}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <Card className="p-8">
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-[var(--text-tertiary)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Vista de Calendario
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              Calendario completo con react-day-picker se integrará aquí. Mostrará todas las tareas en vista mensual/semanal con drag-and-drop.
            </p>
            <Button className="mt-6">
              Implementar Calendario
            </Button>
          </div>
        </Card>
      )}
    </PageContainer>
  );
}
