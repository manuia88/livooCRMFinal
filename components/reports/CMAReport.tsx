'use client';

import { Card } from '@/components/ui/card';
import { sampleCMAData, formatCurrency, formatNumber } from '@/lib/data/reportsData';
import { Building2, TrendingUp, MapPin, Calendar } from 'lucide-react';
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
import PDFExporter from './PDFExporter';

export default function CMAReport() {
    const cma = sampleCMAData;

    // Prepare chart data
    const chartData = cma.comparables.map((comp) => ({
        name: comp.address.split(' ').slice(0, 2).join(' '),
        Precio: comp.price,
        'Precio Ajustado': comp.adjustedPrice,
    }));

    return (
        <div className="space-y-6">
            {/* Export Button */}
            <div className="flex justify-end">
                <PDFExporter
                    elementId="cma-report-content"
                    filename={`CMA-${cma.subjectProperty.address.replace(/ /g, '-')}`}
                    buttonText="Exportar CMA a PDF"
                />
            </div>

            {/* Report Content (this will be exported) */}
            <div id="cma-report-content" className="bg-white p-8 space-y-8">
                {/* Header */}
                <div className="border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Análisis Comparativo de Mercado (CMA)
                    </h1>
                    <p className="text-gray-600">Fecha: {cma.createdAt}</p>
                </div>

                {/* Subject Property */}
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Propiedad Sujeto
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Dirección</p>
                            <p className="text-base font-medium text-gray-900">
                                {cma.subjectProperty.address}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Tipo</p>
                            <p className="text-base font-medium text-gray-900">
                                {cma.subjectProperty.type}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Superficie</p>
                            <p className="text-base font-medium text-gray-900">
                                {formatNumber(cma.subjectProperty.size)} m²
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Recámaras / Baños</p>
                            <p className="text-base font-medium text-gray-900">
                                {cma.subjectProperty.bedrooms} rec · {cma.subjectProperty.bathrooms} baños
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Condición</p>
                            <p className="text-base font-medium text-gray-900">
                                {cma.subjectProperty.condition}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Valuation Summary */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="p-6 bg-blue-50 border-blue-200">
                        <p className="text-sm text-blue-700 mb-1">Valor Mínimo</p>
                        <p className="text-2xl font-bold text-blue-900">
                            {formatCurrency(cma.valuationRange.low)}
                        </p>
                    </Card>
                    <Card className="p-6 bg-green-50 border-green-200">
                        <p className="text-sm text-green-700 mb-1">Valor Estimado</p>
                        <p className="text-2xl font-bold text-green-900">
                            {formatCurrency(cma.valuationRange.mid)}
                        </p>
                    </Card>
                    <Card className="p-6 bg-purple-50 border-purple-200">
                        <p className="text-sm text-purple-700 mb-1">Valor Máximo</p>
                        <p className="text-2xl font-bold text-purple-900">
                            {formatCurrency(cma.valuationRange.high)}
                        </p>
                    </Card>
                </div>

                {/* Recommended Price */}
                <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 mb-1">Precio Recomendado</p>
                            <p className="text-4xl font-bold">
                                {formatCurrency(cma.recommendedPrice)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-8 w-8" />
                            <div>
                                <p className="text-sm text-blue-100">Tendencia</p>
                                <p className="text-lg font-semibold capitalize">{cma.marketTrend === 'up' ? 'Al Alza' : cma.marketTrend === 'down' ? 'A la Baja' : 'Estable'}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Comparables */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Propiedades Comparables
                    </h2>

                    <div className="space-y-4">
                        {cma.comparables.map((comp, idx) => (
                            <Card key={comp.id} className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            Comparable #{idx + 1}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span>{comp.address}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Precio de Venta</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {formatCurrency(comp.price)}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-600">Superficie</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {formatNumber(comp.size)} m²
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Recámaras</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {comp.bedrooms}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Precio/m²</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {formatCurrency(comp.pricePerM2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Días en Mercado</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {comp.daysOnMarket}
                                        </p>
                                    </div>
                                </div>

                                {/* Adjustments */}
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Ajustes:</p>
                                    <div className="grid grid-cols-5 gap-2 text-xs">
                                        <div>
                                            <p className="text-gray-600">Ubicación</p>
                                            <p className={comp.adjustments.location >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                {comp.adjustments.location >= 0 ? '+' : ''}{formatCurrency(comp.adjustments.location)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Tamaño</p>
                                            <p className={comp.adjustments.size >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                {comp.adjustments.size >= 0 ? '+' : ''}{formatCurrency(comp.adjustments.size)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Condición</p>
                                            <p className={comp.adjustments.condition >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                {comp.adjustments.condition >= 0 ? '+' : ''}{formatCurrency(comp.adjustments.condition)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Amenidades</p>
                                            <p className={comp.adjustments.amenities >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                {comp.adjustments.amenities >= 0 ? '+' : ''}{formatCurrency(comp.adjustments.amenities)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Precio Ajustado</p>
                                            <p className="text-blue-600 font-bold">
                                                {formatCurrency(comp.adjustedPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Price Comparison Chart */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Comparación de Precios
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Bar dataKey="Precio" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Precio Ajustado" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Este análisis comparativo de mercado es solo una estimación. Los precios finales pueden variar según las condiciones del mercado y la negociación.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        Generado por Livoo CRM · {new Date().toLocaleDateString('es-MX')}
                    </p>
                </div>
            </div>
        </div>
    );
}
