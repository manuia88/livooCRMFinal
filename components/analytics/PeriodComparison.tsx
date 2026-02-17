'use client';

import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import {
    currentMetrics,
    previousMetrics,
    calculateChange,
    formatCurrency,
    formatNumber,
} from '@/lib/data/analyticsData';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
    label: string;
    current: number;
    previous: number;
    format: 'currency' | 'number';
    sparklineData?: number[];
}

function MetricCard({ label, current, previous, format, sparklineData }: MetricCardProps) {
    const change = calculateChange(current, previous);
    const formatted = format === 'currency' ? formatCurrency(current) : formatNumber(current);

    // Generate simple sparkline data if not provided
    const sparkData =
        sparklineData ||
        Array.from({ length: 7 }, (_, i) => ({
            value: previous + ((current - previous) / 6) * i,
        }));

    const sparkDataWithValue = sparkData.map((val) =>
        typeof val === 'number' ? { value: val } : val
    );

    return (
        <Card className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{formatted}</p>

                    <div className="mt-4 flex items-center gap-2">
                        {change.type === 'increase' && (
                            <>
                                <div className="flex items-center gap-1 text-green-600">
                                    <ArrowUp className="h-4 w-4" />
                                    <span className="text-sm font-semibold">
                                        {change.percentage.toFixed(1)}%
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600">vs período anterior</span>
                            </>
                        )}
                        {change.type === 'decrease' && (
                            <>
                                <div className="flex items-center gap-1 text-red-600">
                                    <ArrowDown className="h-4 w-4" />
                                    <span className="text-sm font-semibold">
                                        {change.percentage.toFixed(1)}%
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600">vs período anterior</span>
                            </>
                        )}
                        {change.type === 'neutral' && (
                            <>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Minus className="h-4 w-4" />
                                    <span className="text-sm font-semibold">0%</span>
                                </div>
                                <span className="text-sm text-gray-600">sin cambios</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Sparkline */}
                <div className="w-24 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparkDataWithValue}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={change.type === 'increase' ? '#10B981' : '#EF4444'}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
}

export default function PeriodComparison() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Comparación de Período</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Últimos 30 días vs 30-60 días atrás
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                    label="Leads Nuevos"
                    current={currentMetrics.leads}
                    previous={previousMetrics.leads}
                    format="number"
                />
                <MetricCard
                    label="Ventas Cerradas"
                    current={currentMetrics.sales}
                    previous={previousMetrics.sales}
                    format="number"
                />
                <MetricCard
                    label="Ingresos Totales"
                    current={currentMetrics.revenue}
                    previous={previousMetrics.revenue}
                    format="currency"
                />
                <MetricCard
                    label="Comisiones"
                    current={currentMetrics.commission}
                    previous={previousMetrics.commission}
                    format="currency"
                />
                <MetricCard
                    label="Propiedades Activas"
                    current={currentMetrics.properties}
                    previous={previousMetrics.properties}
                    format="number"
                />
                <MetricCard
                    label="Días Promedio Cierre"
                    current={currentMetrics.avgDaysToClose}
                    previous={previousMetrics.avgDaysToClose}
                    format="number"
                />
            </div>
        </div>
    );
}
