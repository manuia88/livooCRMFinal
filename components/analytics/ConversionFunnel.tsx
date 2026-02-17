'use client';

import { Card } from '@/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { conversionFunnel, formatNumber, formatPercentage } from '@/lib/data/analyticsData';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg">
                <p className="font-semibold text-gray-900 mb-2">{data.stage}</p>
                <p className="text-sm text-gray-600">
                    Cantidad: <span className="font-medium text-gray-900">{formatNumber(data.count)}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Conversión: <span className="font-medium text-green-600">{formatPercentage(data.conversionRate)}</span>
                </p>
                {data.dropOffRate > 0 && (
                    <p className="text-sm text-gray-600">
                        Drop-off: <span className="font-medium text-red-600">{formatPercentage(data.dropOffRate)}</span>
                    </p>
                )}
            </div>
        );
    }
    return null;
};

export default function ConversionFunnel() {
    // Calculate color based on drop-off rate
    const getBarColor = (index: number) => {
        if (index === 0) return '#3B82F6'; // First stage always blue
        const dropOff = conversionFunnel[index].dropOffRate;
        if (dropOff < 30) return '#10B981'; // Good (green)
        if (dropOff < 50) return '#F59E0B'; // Warning (amber)
        return '#EF4444'; // Poor (red)
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Embudo de Conversión
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Análisis de conversión de leads a cierres
                    </p>
                </div>
            </div>

            {/* Funnel Chart */}
            <div className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={conversionFunnel} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis type="number" stroke="#6B7280" style={{ fontSize: '12px' }} />
                        <YAxis
                            dataKey="stage"
                            type="category"
                            stroke="#6B7280"
                            width={120}
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Cantidad" radius={[0, 4, 4, 0]}>
                            {conversionFunnel.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Conversion Metrics */}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-medium text-green-900">Mejor Conversión</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                        {formatPercentage(Math.max(...conversionFunnel.slice(1).map(s => s.conversionRate)))}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                        Contactados → Calificados
                    </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <p className="text-sm font-medium text-red-900">Mayor Drop-off</p>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                        {formatPercentage(Math.max(...conversionFunnel.map(s => s.dropOffRate)))}
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                        Propuestas → Cierres
                    </p>
                </div>
            </div>

            {/* Overall Conversion Rate */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">
                    Tasa de Conversión Global
                </p>
                <p className="text-3xl font-bold text-blue-600">
                    {formatPercentage((conversionFunnel[5].count / conversionFunnel[0].count) * 100)}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                    {formatNumber(conversionFunnel[5].count)} cierres de {formatNumber(conversionFunnel[0].count)} leads
                </p>
            </div>
        </Card>
    );
}
