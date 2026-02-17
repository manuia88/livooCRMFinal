'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Zap,
    Mail,
    MessageSquare,
    GitBranch,
    Clock,
    CheckCircle,
    Phone,
    Calendar,
    Tag,
} from 'lucide-react';

interface NodeType {
    type: string;
    category: 'trigger' | 'action' | 'condition' | 'delay' | 'end';
    label: string;
    icon: React.ReactNode;
    defaultData: any;
}

const availableNodes: NodeType[] = [
    // Triggers (TriggerNode expects: label, triggerType)
    {
        type: 'trigger',
        category: 'trigger',
        label: 'Nuevo Lead',
        icon: <Zap className="h-5 w-5" />,
        defaultData: { label: 'Nuevo Lead', triggerType: 'new_lead' },
    },
    {
        type: 'trigger',
        category: 'trigger',
        label: 'Cumpleaños',
        icon: <Calendar className="h-5 w-5" />,
        defaultData: { label: 'Cumpleaños', triggerType: 'birthday' },
    },
    {
        type: 'trigger',
        category: 'trigger',
        label: 'Tag Aplicado',
        icon: <Tag className="h-5 w-5" />,
        defaultData: { label: 'Tag Aplicado', triggerType: 'custom' },
    },

    // Actions (ActionNode expects: label, actionType)
    {
        type: 'action',
        category: 'action',
        label: 'Enviar Email',
        icon: <Mail className="h-5 w-5" />,
        defaultData: { label: 'Enviar Email', actionType: 'email' },
    },
    {
        type: 'action',
        category: 'action',
        label: 'Enviar WhatsApp',
        icon: <MessageSquare className="h-5 w-5" />,
        defaultData: { label: 'Enviar WhatsApp', actionType: 'whatsapp' },
    },
    {
        type: 'action',
        category: 'action',
        label: 'Llamada saliente',
        icon: <Phone className="h-5 w-5" />,
        defaultData: { label: 'Llamada Saliente', actionType: 'notification' },
    },

    // Conditions (ConditionNode expects: label, field, operator, value - optional)
    {
        type: 'condition',
        category: 'condition',
        label: 'Condición',
        icon: <GitBranch className="h-5 w-5" />,
        defaultData: { label: 'Condición' },
    },

    // Delay (DelayNode expects: label, duration, unit - optional)
    {
        type: 'delay',
        category: 'delay',
        label: 'Esperar',
        icon: <Clock className="h-5 w-5" />,
        defaultData: { label: 'Esperar', duration: 1, unit: 'hours' as const },
    },

    // End (EndNode expects: label only)
    {
        type: 'end',
        category: 'end',
        label: 'Finalizar',
        icon: <CheckCircle className="h-5 w-5" />,
        defaultData: { label: 'Finalizar' },
    },
];

interface NodePaletteProps {
    onNodeAdd: (nodeType: string, nodeData: any) => void;
}

export default function NodePalette({ onNodeAdd }: NodePaletteProps) {
    const categories = [
        { id: 'trigger', label: 'Triggers', color: 'blue' },
        { id: 'action', label: 'Actions', color: 'purple' },
        { id: 'condition', label: 'Logic', color: 'amber' },
        { id: 'delay', label: 'Timing', color: 'green' },
        { id: 'end', label: 'End', color: 'red' },
    ];

    return (
        <div className="w-64 border-r border-gray-200 bg-white">
            <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Paleta de Nodos</h3>
                <p className="text-xs text-gray-500 mt-1">
                    Haz clic para agregar al canvas
                </p>
            </div>

            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 space-y-6">
                    {categories.map((category) => {
                        const categoryNodes = availableNodes.filter(
                            (n) => n.category === category.id
                        );

                        if (categoryNodes.length === 0) return null;

                        return (
                            <div key={category.id}>
                                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                                    {category.label}
                                </h4>
                                <div className="space-y-2">
                                    {categoryNodes.map((node, idx) => (
                                        <Card
                                            key={`${node.type}-${idx}`}
                                            className="p-3 cursor-pointer hover:shadow-md transition-shadow hover:border-[var(--loft-orange)]"
                                            onClick={() => onNodeAdd(node.type, node.defaultData)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`text-${category.color}-600`}>
                                                    {node.icon}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {node.label}
                                                </span>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
