'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Key, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HandoversTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Calendario de Entregas</h3>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full text-blue-600">
                            <Key className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-800 font-medium">Próxima Entrega</p>
                            <p className="text-2xl font-bold text-blue-900">15 Dic 2026</p>
                            <p className="text-xs text-blue-600">Torre A - Pisos 1-5</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full text-green-600">
                            <ClipboardList className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-green-800 font-medium">Unidades Listas</p>
                            <p className="text-2xl font-bold text-green-900">0 / 45</p>
                            <p className="text-xs text-green-600">Fase de Acabados</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="border rounded-lg p-8 text-center bg-gray-50">
                <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-900">Sin entregas programadas este mes</h4>
                <p className="text-gray-500 mb-4">La fase de entregas está programada para comenzar en Q4 2026.</p>
                <Button variant="outline">Ver Todo el Calendario</Button>
            </div>
        </div>
    );
}
