'use client';

import { Handle, Position } from '@xyflow/react';
import { GitBranch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ConditionNodeProps {
    data: {
        label: string;
        field?: string;
        operator?: string;
        value?: string;
        description?: string;
    };
    selected?: boolean;
}

export default function ConditionNode({ data, selected }: ConditionNodeProps) {
    return (
        <div
            className={`min-w-[200px] bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg transition-all ${selected ? 'ring-4 ring-yellow-300 scale-105' : 'hover:shadow-xl'
                }`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-white !w-3 !h-3 !border-2 !border-yellow-500"
            />

            <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 p-2 rounded">
                        <GitBranch className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-medium opacity-75">CONDITION</div>
                        <div className="font-semibold text-sm">{data.label}</div>
                    </div>
                </div>

                {/* Condition Formula */}
                {data.field && data.operator && data.value && (
                    <div className="mt-2 text-xs bg-white/10 rounded p-2 font-mono">
                        {data.field} {data.operator} {data.value}
                    </div>
                )}

                {/* Description */}
                {data.description && (
                    <p className="text-xs opacity-90 mt-2">{data.description}</p>
                )}

                {/* Not Configured Badge */}
                {!data.field && (
                    <Badge variant="destructive" className="mt-2 text-xs">
                        Sin configurar
                    </Badge>
                )}
            </div>

            {/* Output Handles - True and False */}
            <div className="flex justify-between px-4 pb-2">
                <div className="text-xs">
                    <div className="text-center mb-1">Sí</div>
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="true"
                        className="!bg-green-400 !w-3 !h-3 !border-2 !border-white !relative !left-0 !transform-none"
                    />
                </div>
                <div className="text-xs">
                    <div className="text-center mb-1">No</div>
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="false"
                        className="!bg-red-400 !w-3 !h-3 !border-2 !border-white !relative !right-0 !transform-none"
                    />
                </div>
            </div>
        </div>
    );
}
