'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { developmentData, Unit, UnitStatus } from '@/lib/data/adminDesarrollosData';
import { UnitStatusBadge } from './UnitStatusBadge';
import { DollarSign, Maximize2, Bed, Bath } from 'lucide-react';

export default function InventoryMatrix() {
    const [selectedTower, setSelectedTower] = useState(developmentData.towers[0].id);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const currentTower = developmentData.towers.find(t => t.id === selectedTower);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const filterUnits = (units: Unit[]) => {
        if (filterStatus === 'all') return units;
        return units.filter(u => u.status === filterStatus);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">Matriz de Inventario</h2>

                <div className="flex flex-wrap gap-3">
                    <Select value={selectedTower} onValueChange={setSelectedTower}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar Torre" />
                        </SelectTrigger>
                        <SelectContent>
                            {developmentData.towers.map(tower => (
                                <SelectItem key={tower.id} value={tower.id}>{tower.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="available">Disponible</SelectItem>
                            <SelectItem value="reserved">Reservado</SelectItem>
                            <SelectItem value="sold">Vendido</SelectItem>
                            <SelectItem value="blocked">Bloqueado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="overflow-hidden">
                <CardContent className="p-6 overflow-x-auto">
                    <div className="min-w-[800px]">
                        {currentTower?.floors.map((floor) => (
                            <div key={floor.number} className="flex border-b border-gray-100 last:border-0 py-2">
                                <div className="w-24 flex-shrink-0 flex items-center justify-center font-semibold text-gray-500 bg-gray-50 rounded-l-md mr-4">
                                    Piso {floor.number}
                                </div>

                                <div className="flex-1 grid grid-cols-4 gap-4">
                                    {floor.units.map((unit) => {
                                        const isFiltered = filterStatus !== 'all' && unit.status !== filterStatus;

                                        return (
                                            <div
                                                key={unit.id}
                                                onClick={() => !isFiltered && setSelectedUnit(unit)}
                                                className={`
                          relative p-3 rounded-md border text-sm transition-all cursor-pointer
                          ${isFiltered ? 'opacity-20 pointer-events-none' : 'hover:shadow-md hover:scale-[1.02]'}
                          ${unit.status === 'available' ? 'bg-green-50 border-green-200 hover:border-green-300' : ''}
                          ${unit.status === 'reserved' ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-300' : ''}
                          ${unit.status === 'sold' ? 'bg-red-50 border-red-200 hover:border-red-300' : ''}
                          ${unit.status === 'blocked' ? 'bg-gray-50 border-gray-200 hover:border-gray-300' : ''}
                        `}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-gray-900">Unit {unit.number}</span>
                                                    <div className={`w-2 h-2 rounded-full 
                            ${unit.status === 'available' ? 'bg-green-500' : ''}
                            ${unit.status === 'reserved' ? 'bg-yellow-500' : ''}
                            ${unit.status === 'sold' ? 'bg-red-500' : ''}
                            ${unit.status === 'blocked' ? 'bg-gray-400' : ''}
                          `} />
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-xs text-gray-600 truncate">{unit.type}</p>
                                                    <p className="font-medium text-gray-900">{formatCurrency(unit.price)}</p>
                                                    <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                                        <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" /> {unit.area}m²</span>
                                                        <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {unit.bedrooms}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Unit Details Modal */}
            <Dialog open={!!selectedUnit} onOpenChange={(open) => !open && setSelectedUnit(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <div className="flex justify-between items-center pr-8">
                            <DialogTitle className="text-2xl">Unidad {selectedUnit?.number}</DialogTitle>
                            {selectedUnit && <UnitStatusBadge status={selectedUnit.status} />}
                        </div>
                        <DialogDescription>
                            {selectedUnit?.type} en Piso {selectedUnit?.floor} • Torre {currentTower?.name}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedUnit && (
                        <div className="space-y-6 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Precio de Lista</p>
                                    <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedUnit.price)}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500 mb-1">Superficie</p>
                                    <p className="text-xl font-bold text-gray-900">{selectedUnit.area} m²</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Bed className="h-4 w-4 text-gray-500" />
                                    <span>{selectedUnit.bedrooms} Recámaras</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bath className="h-4 w-4 text-gray-500" />
                                    <span>{selectedUnit.bathrooms} Baños</span>
                                </div>
                            </div>

                            {selectedUnit.status === 'reserved' && (
                                <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                                    <p className="text-sm text-yellow-800 font-medium">Reservado por: {selectedUnit.reservedBy}</p>
                                    <p className="text-xs text-yellow-600">Fecha: {selectedUnit.reservedAt}</p>
                                </div>
                            )}

                            {selectedUnit.status === 'sold' && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                                    <p className="text-sm text-red-800 font-medium">Vendido a: {selectedUnit.soldTo}</p>
                                    <p className="text-xs text-red-600">Fecha: {selectedUnit.soldAt}</p>
                                </div>
                            )}

                            <div className="flex gap-3 justify-end pt-2">
                                <Button variant="outline" onClick={() => setSelectedUnit(null)}>Cerrar</Button>
                                {selectedUnit.status === 'available' && (
                                    <Button className="bg-blue-600 hover:bg-blue-700">Reservar Unidad</Button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
