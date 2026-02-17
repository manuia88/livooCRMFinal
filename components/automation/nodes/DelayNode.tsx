'use client';

import { Handle, Position } from '@xyflow/react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DelayNodeProps {
    data: {
        label: string;
        duration?: number;
        unit?: 'minutes' | 'hours' | 'days';
        description?: string;
    };
    selected?: boolean;
}

export default function DelayNode({ data, selected }: DelayNodeProps) {
    const getDurationText = () => {
        if (!data.duration || !data.unit) return 'Sin configurar';

        const unitText = {
            minutes: data.duration === 1 ? 'minuto' : 'minutos',
            hours: data.duration === 1 ? 'hora' : 'horas',
            days: data.duration === 1 ? 'día' : 'días',
        };

        return `${data.duration} ${unitText[data.unit]}`;
    };

    return (
        <div
            className={`min-w-[180px] bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg transition-all ${selected ? 'ring-4 ring-orange-300 scale-105' : 'hover:shadow-xl'
                }`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-white !w-3 !h-3 !border-2 !border-orange-500"
            />

            <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 p-2 rounded">
                        <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-medium opacity-75">DELAY</div>
                        <div className="font-semibold text-sm">{data.label}</div>
                    </div>
                </div>

                {/* Duration Display */}
                <div className="mt-2">
                    {data.duration && data.unit ? (
                        <Badge className="bg-white/20 text-white border-0">
                            {getDurationText()}
                        </Badge>
                    ) : (
                        <Badge variant="destructive" className="text-xs">
                            Sin configurar
                        </Badge>
                    )}
                </div>

                {/* Description */}
                {data.description && (
                    <p className="text-xs opacity-90 mt-2">{data.description}</p>
                )}
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="!bg-white !w-3 !h-3 !border-2 !border-orange-500"
            />
        </div>
    );
}
