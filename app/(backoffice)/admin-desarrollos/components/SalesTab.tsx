'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { salesData } from '@/lib/data/adminDesarrollosData';
import { FileText, CheckCircle, Clock } from 'lucide-react';

export default function SalesTab() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Pipeline de Ventas</h3>

            <div className="grid gap-4">
                {salesData.map((sale) => (
                    <Card key={sale.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Unidad {sale.unit}</h4>
                                    <p className="text-sm text-gray-600">{sale.client}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 items-center">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Valor</p>
                                    <p className="font-bold text-gray-900">{sale.measure}</p>
                                </div>

                                <div className="min-w-[120px]">
                                    <Badge className={`w-full justify-center ${sale.status === 'Escriturado' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                            sale.status === 'Apartado' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                                'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                        }`}>
                                        {sale.status}
                                    </Badge>
                                    <div className="flex items-center justify-end gap-1 mt-1 text-xs text-gray-500">
                                        <Clock className="h-3 w-3" />
                                        <span>{sale.date}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
