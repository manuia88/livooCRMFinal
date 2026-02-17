'use client';

import { Card } from '@/components/ui/card';
import { agentPerformance, formatCurrency, formatNumber } from '@/lib/data/analyticsData';
import { TrendingUp, Award, Target } from 'lucide-react';

export default function AgentMetrics() {
    // Calculate total revenue for percentage
    const totalRevenue = agentPerformance.reduce((sum, agent) => sum + agent.revenue, 0);

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Métricas por Asesor</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Top 5 asesores del período
                    </p>
                </div>
                <Award className="h-6 w-6 text-amber-500" />
            </div>

            <div className="space-y-4">
                {agentPerformance.map((agent, index) => {
                    const revenuePercentage = (agent.revenue / totalRevenue) * 100;

                    return (
                        <div
                            key={agent.id}
                            className="relative p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
                        >
                            {/* Rank Badge */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {index + 1}
                            </div>

                            <div className="flex items-start gap-4 ml-4">
                                {/* Avatar */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
                                    {agent.avatar}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-semibold text-gray-900">
                                        {agent.name}
                                    </p>

                                    {/* Metrics Grid */}
                                    <div className="mt-3 grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Ventas</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                {agent.sales}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Ingresos</p>
                                            <p className="text-lg font-bold text-green-600">
                                                {formatCurrency(agent.revenue)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Comisión</p>
                                            <p className="text-lg font-bold text-blue-600">
                                                {formatCurrency(agent.commission)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Performance Indicators */}
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded text-xs">
                                            <TrendingUp className="h-3 w-3 text-green-600" />
                                            <span className="text-green-700 font-medium">
                                                {agent.conversionRate.toFixed(1)}% conv.
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-xs">
                                            <Target className="h-3 w-3 text-blue-600" />
                                            <span className="text-blue-700 font-medium">
                                                {agent.avgDaysToClose} días cierre
                                            </span>
                                        </div>
                                        <div className="px-2 py-1 bg-purple-50 rounded text-xs">
                                            <span className="text-purple-700 font-medium">
                                                Pipeline: {formatCurrency(agent.pipelineValue)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Revenue Bar */}
                                    <div className="mt-3">
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                                style={{ width: `${revenuePercentage}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {revenuePercentage.toFixed(1)}% del total de ingresos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {agentPerformance.reduce((sum, a) => sum + a.sales, 0)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Ventas Totales</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(totalRevenue)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Ingresos Totales</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                        {(agentPerformance.reduce((sum, a) => sum + a.conversionRate, 0) / agentPerformance.length).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Conv. Promedio</p>
                </div>
            </div>
        </Card>
    );
}
