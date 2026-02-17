'use client';

import { Card } from '@/components/ui/card';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    revenueByType,
    revenueBySource,
    formatCurrency,
} from '@/lib/data/analyticsData';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-lg">
                <p className="font-semibold text-gray-900">{payload[0].name}</p>
                <p className="text-sm text-gray-600 mt-1">
                    {formatCurrency(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

export default function RevenueBreakdown() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue by Property Type */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ingresos por Tipo de Propiedad
                </h3>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    {/* Pie Chart */}
                    <div className="w-full lg:w-1/2">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={revenueByType}
                                    dataKey="amount"
                                    nameKey="type"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ percentage }) => `${percentage.toFixed(1)}%`}
                                >
                                    {revenueByType.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="w-full lg:w-1/2 space-y-3">
                        {revenueByType.map((item) => (
                            <div key={item.type} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded"
                                        style={{ backgroundColor: item.fill }}
                                    />
                                    <span className="text-sm text-gray-700">{item.type}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {formatCurrency(item.amount)}
                                    </p>
                                    <p className="text-xs text-gray-600">{item.percentage}%</p>
                                </div>
                            </div>
                        ))}
                        <div className="pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-900">Total</span>
                                <span className="text-sm font-bold text-blue-600">
                                    {formatCurrency(
                                        revenueByType.reduce((sum, item) => sum + item.amount, 0)
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Revenue by Source */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ingresos por Fuente de Leads
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueBySource}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="source"
                            stroke="#6B7280"
                            style={{ fontSize: '12px' }}
                            angle={-15}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            stroke="#6B7280"
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="amount" name="Ingresos" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

                {/* Source Details */}
                <div className="mt-4 space-y-2">
                    {revenueBySource.map((source, idx) => {
                        const total = revenueBySource.reduce((sum, s) => sum + s.amount, 0);
                        const percentage = (source.amount / total) * 100;

                        return (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-700">
                                            {source.source}
                                        </span>
                                        <span className="text-xs text-gray-600">
                                            {percentage.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
