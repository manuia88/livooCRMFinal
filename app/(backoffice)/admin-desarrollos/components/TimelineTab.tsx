'use client';

import { Card } from '@/components/ui/card';
import { timelineData } from '@/lib/data/adminDesarrollosData';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function TimelineTab() {
    return (
        <div className="space-y-6 p-4">
            <h3 className="text-lg font-semibold mb-6">Progreso de Obra</h3>

            <div className="relative border-l-2 border-gray-200 ml-3 space-y-12">
                {timelineData.map((event) => (
                    <div key={event.id} className="relative pl-8">
                        {/* Status Icon */}
                        <div className={`absolute -left-[9px] top-1 bg-white p-1 rounded-full border-2 ${event.status === 'completed' ? 'border-green-500 text-green-500' :
                                event.status === 'in-progress' ? 'border-blue-500 text-blue-500' :
                                    'border-gray-300 text-gray-300'
                            }`}>
                            {event.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                            {event.status === 'in-progress' && <Clock className="h-4 w-4 animate-pulse" />}
                            {event.status === 'pending' && <Circle className="h-4 w-4" />}
                        </div>

                        <Card className={`p-4 ${event.status === 'pending' ? 'opacity-60 bg-gray-50' : 'bg-white'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-gray-900">{event.stage}</h4>
                                <span className={`text-sm font-medium px-2 py-1 rounded ${event.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        event.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {event.date}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-3">{event.description}</p>

                            {/* Visual Progress Bar for Active Items */}
                            {event.status === 'in-progress' && (
                                <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full w-[60%] animate-pulse"></div>
                                </div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
