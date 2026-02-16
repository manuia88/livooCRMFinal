'use client';

import { useState } from 'react';
import {
    Target,
    Zap,
    Clock,
    Cake,
    Home,
    Calendar,
    MessageSquare,
    Mail,
    CheckSquare,
    UserPlus,
    Tag,
    Edit,
    Bell,
    GitBranch,
    Circle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NodePaletteProps {
    onNodeAdd?: (nodeType: string, nodeData: any) => void;
}

const nodeCategories = {
    triggers: [
        {
            id: 'new_lead',
            type: 'trigger',
            label: 'Nuevo Lead',
            icon: Target,
            color: 'bg-green-500',
            data: {
                label: 'Nuevo Lead',
                triggerType: 'new_lead',
                description: 'Cuando se crea un nuevo lead',
            },
        },
        {
            id: 'stage_change',
            type: 'trigger',
            label: 'Cambio Etapa',
            icon: Zap,
            color: 'bg-green-500',
            data: {
                label: 'Cambio de Etapa',
                triggerType: 'stage_change',
                description: 'Cuando un lead cambia de etapa',
            },
        },
        {
            id: 'time_based',
            type: 'trigger',
            label: 'Tiempo sin Contacto',
            icon: Clock,
            color: 'bg-green-500',
            data: {
                label: 'Sin Contacto 48h',
                triggerType: 'time_based',
                description: '48 horas sin contactar',
            },
        },
        {
            id: 'birthday',
            type: 'trigger',
            label: 'Cumpleaños',
            icon: Cake,
            color: 'bg-green-500',
            data: {
                label: 'Cumpleaños Cliente',
                triggerType: 'birthday',
                description: 'Día del cumpleaños',
            },
        },
        {
            id: 'new_property',
            type: 'trigger',
            label: 'Nueva Propiedad',
            icon: Home,
            color: 'bg-green-500',
            data: {
                label: 'Nueva Propiedad',
                triggerType: 'new_property',
                description: 'Nueva propiedad publicada',
            },
        },
    ],
    conditions: [
        {
            id: 'if_else',
            type: 'condition',
            label: 'If/Else',
            icon: GitBranch,
            color: 'bg-yellow-500',
            data: {
                label: 'Condición If/Else',
                description: 'Evaluar condición',
            },
        },
    ],
    actions: [
        {
            id: 'whatsapp',
            type: 'action',
            label: 'WhatsApp',
            icon: MessageSquare,
            color: 'bg-blue-500',
            data: {
                label: 'Enviar WhatsApp',
                actionType: 'whatsapp',
                description: 'Mensaje de WhatsApp',
            },
        },
        {
            id: 'email',
            type: 'action',
            label: 'Email',
            icon: Mail,
            color: 'bg-blue-500',
            data: {
                label: 'Enviar Email',
                actionType: 'email',
                description: 'Correo electrónico',
            },
        },
        {
            id: 'create_task',
            type: 'action',
            label: 'Crear Tarea',
            icon: CheckSquare,
            color: 'bg-blue-500',
            data: {
                label: 'Crear Tarea',
                actionType: 'create_task',
                description: 'Nueva tarea',
            },
        },
        {
            id: 'assign_agent',
            type: 'action',
            label: 'Asignar Agente',
            icon: UserPlus,
            color: 'bg-blue-500',
            data: {
                label: 'Asignar Agente',
                actionType: 'assign_agent',
                description: 'Asignar a agente',
            },
        },
        {
            id: 'add_tag',
            type: 'action',
            label: 'Agregar Tag',
            icon: Tag,
            color: 'bg-blue-500',
            data: {
                label: 'Agregar Tag',
                actionType: 'add_tag',
                description: 'Etiquetar contacto',
            },
        },
        {
            id: 'update_field',
            type: 'action',
            label: 'Actualizar Campo',
            icon: Edit,
            color: 'bg-blue-500',
            data: {
                label: 'Actualizar Campo',
                actionType: 'update_field',
                description: 'Modificar dato',
            },
        },
        {
            id: 'notification',
            type: 'action',
            label: 'Notificación',
            icon: Bell,
            color: 'bg-blue-500',
            data: {
                label: 'Notificación',
                actionType: 'notification',
                description: 'Aviso interno',
            },
        },
    ],
    delays: [
        {
            id: 'delay',
            type: 'delay',
            label: 'Esperar',
            icon: Clock,
            color: 'bg-orange-500',
            data: {
                label: 'Esperar',
                description: 'Demora temporal',
            },
        },
    ],
    end: [
        {
            id: 'end',
            type: 'end',
            label: 'Fin',
            icon: Circle,
            color: 'bg-red-500',
            data: {
                label: 'Fin',
            },
        },
    ],
};

export default function NodePalette({ onNodeAdd }: NodePaletteProps) {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    const handleNodeClick = (nodeType: string, nodeData: any) => {
        onNodeAdd?.(nodeType, nodeData);
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
                <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-4">
                    Nodos Disponibles
                </h3>

                {/* Triggers */}
                <div className="mb-4">
                    <button
                        onClick={() => toggleCategory('triggers')}
                        className="w-full text-left font-medium text-xs text-[var(--text-secondary)] mb-2 hover:text-[var(--text-primary)]"
                    >
                        TRIGGERS (INICIO)
                    </button>
                    {!collapsed.triggers && (
                        <div className="space-y-2">
                            {nodeCategories.triggers.map((node) => {
                                const Icon = node.icon;
                                return (
                                    <button
                                        key={node.id}
                                        onClick={() => handleNodeClick(node.type, node.data)}
                                        className="w-full p-2 rounded border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`${node.color} p-1.5 rounded text-white`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-[var(--text-primary)]">
                                                    {node.label}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Conditions */}
                <div className="mb-4">
                    <button
                        onClick={() => toggleCategory('conditions')}
                        className="w-full text-left font-medium text-xs text-[var(--text-secondary)] mb-2 hover:text-[var(--text-primary)]"
                    >
                        CONDICIONES
                    </button>
                    {!collapsed.conditions && (
                        <div className="space-y-2">
                            {nodeCategories.conditions.map((node) => {
                                const Icon = node.icon;
                                return (
                                    <button
                                        key={node.id}
                                        onClick={() => handleNodeClick(node.type, node.data)}
                                        className="w-full p-2 rounded border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`${node.color} p-1.5 rounded text-white`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-[var(--text-primary)]">
                                                    {node.label}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="mb-4">
                    <button
                        onClick={() => toggleCategory('actions')}
                        className="w-full text-left font-medium text-xs text-[var(--text-secondary)] mb-2 hover:text-[var(--text-primary)]"
                    >
                        ACCIONES
                    </button>
                    {!collapsed.actions && (
                        <div className="space-y-2">
                            {nodeCategories.actions.map((node) => {
                                const Icon = node.icon;
                                return (
                                    <button
                                        key={node.id}
                                        onClick={() => handleNodeClick(node.type, node.data)}
                                        className="w-full p-2 rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`${node.color} p-1.5 rounded text-white`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-[var(--text-primary)]">
                                                    {node.label}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Delays */}
                <div className="mb-4">
                    <button
                        onClick={() => toggleCategory('delays')}
                        className="w-full text-left font-medium text-xs text-[var(--text-secondary)] mb-2 hover:text-[var(--text-primary)]"
                    >
                        DELAYS
                    </button>
                    {!collapsed.delays && (
                        <div className="space-y-2">
                            {nodeCategories.delays.map((node) => {
                                const Icon = node.icon;
                                return (
                                    <button
                                        key={node.id}
                                        onClick={() => handleNodeClick(node.type, node.data)}
                                        className="w-full p-2 rounded border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`${node.color} p-1.5 rounded text-white`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-[var(--text-primary)]">
                                                    {node.label}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* End */}
                <div className="mb-4">
                    <button
                        onClick={() => toggleCategory('end')}
                        className="w-full text-left font-medium text-xs text-[var(--text-secondary)] mb-2 hover:text-[var(--text-primary)]"
                    >
                        FIN
                    </button>
                    {!collapsed.end && (
                        <div className="space-y-2">
                            {nodeCategories.end.map((node) => {
                                const Icon = node.icon;
                                return (
                                    <button
                                        key={node.id}
                                        onClick={() => handleNodeClick(node.type, node.data)}
                                        className="w-full p-2 rounded border border-gray-200 hover:border-red-400 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`${node.color} p-1.5 rounded text-white`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-[var(--text-primary)]">
                                                    {node.label}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <Card className="mt-6 p-3 bg-blue-50 border-blue-200">
                    <p className="text-xs text-blue-900">
                        <strong>Cómo usar:</strong> Click en cualquier nodo para agregarlo al canvas.
                        Conecta los nodos arrastrando desde los puntos de conexión.
                    </p>
                </Card>
            </div>
        </div>
    );
}
