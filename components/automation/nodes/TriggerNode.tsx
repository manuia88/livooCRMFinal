'use client';

import { Handle, Position } from '@xyflow/react';
import { Target, Zap, Clock, Cake, Calendar, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TriggerNodeProps {
    data: {
        label: string;
        triggerType: 'new_lead' | 'stage_change' | 'time_based' | 'birthday' | 'new_property' | 'custom';
        description?: string;
        config?: any;
    };
    selected?: boolean;
}

const triggerIcons = {
    new_lead: Target,
    stage_change: Zap,
    time_based: Clock,
    birthday: Cake,
    new_property: Home,
    custom: Calendar,
};

export default function TriggerNode({ data, selected }: TriggerNodeProps) {
    const Icon = triggerIcons[data.triggerType] || Target;

    return (
        <div
            className={`min-w-[200px] bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg transition-all ${selected ? 'ring-4 ring-green-300 scale-105' : 'hover:shadow-xl'
                }`}
        >
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 p-2 rounded">
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-medium opacity-75">TRIGGER</div>
                        <div className="font-semibold text-sm">{data.label}</div>
                    </div>
                </div>

                {/* Description */}
                {data.description && (
                    <p className="text-xs opacity-90 mt-2">{data.description}</p>
                )}

                {/* Config Badge */}
                {data.config && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                        {data.config.summary || 'Configurado'}
                    </Badge>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="!bg-white !w-3 !h-3 !border-2 !border-green-500"
            />
        </div>
    );
}
