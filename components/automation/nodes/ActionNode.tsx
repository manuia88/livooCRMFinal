'use client';

import { Handle, Position } from 'reactflow';
import { MessageSquare, Mail, CheckSquare, UserPlus, Tag, Edit, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ActionNodeProps {
    data: {
        label: string;
        actionType: 'whatsapp' | 'email' | 'create_task' | 'assign_agent' | 'add_tag' | 'update_field' | 'notification';
        description?: string;
        config?: any;
    };
    selected?: boolean;
}

const actionIcons = {
    whatsapp: MessageSquare,
    email: Mail,
    create_task: CheckSquare,
    assign_agent: UserPlus,
    add_tag: Tag,
    update_field: Edit,
    notification: Bell,
};

export default function ActionNode({ data, selected }: ActionNodeProps) {
    const Icon = actionIcons[data.actionType] || MessageSquare;

    return (
        <div
            className={`min-w-[200px] bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg transition-all ${selected ? 'ring-4 ring-blue-300 scale-105' : 'hover:shadow-xl'
                }`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-white !w-3 !h-3 !border-2 !border-blue-500"
            />

            <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 p-2 rounded">
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-medium opacity-75">ACTION</div>
                        <div className="font-semibold text-sm">{data.label}</div>
                    </div>
                </div>

                {/* Description */}
                {data.description && (
                    <p className="text-xs opacity-90 mt-2">{data.description}</p>
                )}

                {/* Config Summary */}
                {data.config?.template && (
                    <div className="mt-2 text-xs bg-white/10 rounded p-2">
                        <p className="truncate">{data.config.template}</p>
                    </div>
                )}

                {/* Status Badge */}
                {!data.config && (
                    <Badge variant="destructive" className="mt-2 text-xs">
                        Sin configurar
                    </Badge>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="!bg-white !w-3 !h-3 !border-2 !border-blue-500"
            />
        </div>
    );
}
