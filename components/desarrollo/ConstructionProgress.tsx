'use client';

import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Milestone } from '@/types/desarrollo';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface ConstructionProgressProps {
    progress: number;
    milestones: Milestone[];
    deliveryDate: string;
}

export function ConstructionProgress({ progress, milestones, deliveryDate }: ConstructionProgressProps) {
    const getStatusIcon = (status: Milestone['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'in-progress':
                return <Clock className="h-5 w-5 text-[var(--loft-orange)]" />;
            case 'pending':
                return <Circle className="h-5 w-5 text-gray-300" />;
        }
    };

    const getStatusBadge = (status: Milestone['status']) => {
        switch (status) {
            case 'completed':
                return <Badge variant="success">Completado</Badge>;
            case 'in-progress':
                return <Badge variant="loft">En Proceso</Badge>;
            case 'pending':
                return <Badge variant="outline">Pendiente</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Avance de Obra</h3>
                <p className="text-gray-600">Seguimiento en tiempo real del proyecto</p>
            </div>

            {/* Progress Bar */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Progreso Total</p>
                        <p className="text-4xl font-bold text-gray-900">{progress}%</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Entrega estimada</p>
                        <p className="text-2xl font-bold text-[var(--loft-orange)]">{deliveryDate}</p>
                    </div>
                </div>

                <Progress value={progress} className="h-3" />

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-[var(--loft-orange)]" />
                    <span>Actualizado: {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}</span>
                </div>
            </Card>

            {/* Timeline */}
            <div className="space-y-4">
                {milestones.map((milestone, index) => (
                    <Card
                        key={index}
                        className={`p-5 ${milestone.status === 'in-progress'
                                ? 'ring-2 ring-[var(--loft-orange)] bg-[var(--loft-orange-light)]'
                                : ''
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0 mt-1">
                                {getStatusIcon(milestone.status)}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            {milestone.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">{milestone.date}</p>
                                    </div>
                                    {getStatusBadge(milestone.status)}
                                </div>

                                {/* Progress line (if not last item) */}
                                {index < milestones.length - 1 && milestone.status === 'completed' && (
                                    <div className="ml-0.5 mt-3 h-8 w-0.5 bg-green-500/30" />
                                )}
                                {index < milestones.length - 1 && milestone.status !== 'completed' && (
                                    <div className="ml-0.5 mt-3 h-8 w-0.5 bg-gray-200" />
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
