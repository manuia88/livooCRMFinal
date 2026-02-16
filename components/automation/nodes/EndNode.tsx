'use client';

import { Handle, Position } from 'reactflow';
import { Circle } from 'lucide-react';

interface EndNodeProps {
    data: {
        label: string;
    };
    selected?: boolean;
}

export default function EndNode({ data, selected }: EndNodeProps) {
    return (
        <div
            className={`min-w-[150px] bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow-lg transition-all ${selected ? 'ring-4 ring-red-300 scale-105' : 'hover:shadow-xl'
                }`}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-white !w-3 !h-3 !border-2 !border-red-500"
            />

            <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 justify-center">
                    <div className="bg-white/20 p-2 rounded">
                        <Circle className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                        <div className="text-xs font-medium opacity-75">END</div>
                        <div className="font-semibold text-sm">{data.label}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
