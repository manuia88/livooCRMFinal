'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { Node } from '@xyflow/react';

interface NodeConfigPanelProps {
    selectedNode: Node | null;
    onClose: () => void;
    onUpdate: (nodeId: string, data: any) => void;
}

export default function NodeConfigPanel({
    selectedNode,
    onClose,
    onUpdate,
}: NodeConfigPanelProps) {
    const [localData, setLocalData] = useState<any>({});

    useEffect(() => {
        if (selectedNode) {
            setLocalData(selectedNode.data);
        }
    }, [selectedNode]);

    if (!selectedNode) return null;

    const handleSave = () => {
        onUpdate(selectedNode.id, localData);
        onClose();
    };

    const renderConfigFields = () => {
        switch (selectedNode.type) {
            case 'trigger':
                return (
                    <>
                        <div>
                            <Label htmlFor="triggerLabel">Nombre del Trigger</Label>
                            <Input
                                id="triggerLabel"
                                value={localData.label || ''}
                                onChange={(e) =>
                                    setLocalData({ ...localData, label: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="triggerType">Tipo de Trigger</Label>
                            <Select
                                value={localData.trigger || 'new_lead'}
                                onValueChange={(value) =>
                                    setLocalData({ ...localData, trigger: value })
                                }
                            >
                                <SelectTrigger id="triggerType">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new_lead">Nuevo Lead</SelectItem>
                                    <SelectItem value="birthday">Cumpleaños</SelectItem>
                                    <SelectItem value="tag_applied">Tag Aplicado</SelectItem>
                                    <SelectItem value="property_favorited">
                                        Propiedad Favorita
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                );

            case 'action':
                return (
                    <>
                        <div>
                            <Label htmlFor="actionLabel">Nombre de la Acción</Label>
                            <Input
                                id="actionLabel"
                                value={localData.label || ''}
                                onChange={(e) =>
                                    setLocalData({ ...localData, label: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="actionType">Tipo de Acción</Label>
                            <Select
                                value={localData.action || 'send_email'}
                                onValueChange={(value) =>
                                    setLocalData({ ...localData, action: value })
                                }
                            >
                                <SelectTrigger id="actionType">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="send_email">Enviar Email</SelectItem>
                                    <SelectItem value="send_whatsapp">Enviar WhatsApp</SelectItem>
                                    <SelectItem value="make_call">Llamada Saliente</SelectItem>
                                    <SelectItem value="create_task">Crear Tarea</SelectItem>
                                    <SelectItem value="add_tag">Agregar Tag</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {(localData.action === 'send_email' ||
                            localData.action === 'send_whatsapp') && (
                                <div>
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea
                                        id="message"
                                        value={localData.message || ''}
                                        onChange={(e) =>
                                            setLocalData({ ...localData, message: e.target.value })
                                        }
                                        rows={4}
                                        placeholder="Escribe el mensaje aquí..."
                                    />
                                </div>
                            )}
                    </>
                );

            case 'condition':
                return (
                    <>
                        <div>
                            <Label htmlFor="conditionLabel">Nombre de la Condición</Label>
                            <Input
                                id="conditionLabel"
                                value={localData.label || ''}
                                onChange={(e) =>
                                    setLocalData({ ...localData, label: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="conditionField">Campo</Label>
                            <Select
                                value={localData.field || 'status'}
                                onValueChange={(value) =>
                                    setLocalData({ ...localData, field: value })
                                }
                            >
                                <SelectTrigger id="conditionField">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="status">Estado</SelectItem>
                                    <SelectItem value="tags">Tags</SelectItem>
                                    <SelectItem value="score">Score</SelectItem>
                                    <SelectItem value="last_contact">Último Contacto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="conditionOperator">Operador</Label>
                            <Select
                                value={localData.operator || 'equals'}
                                onValueChange={(value) =>
                                    setLocalData({ ...localData, operator: value })
                                }
                            >
                                <SelectTrigger id="conditionOperator">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="equals">Igual a</SelectItem>
                                    <SelectItem value="not_equals">Diferente de</SelectItem>
                                    <SelectItem value="contains">Contiene</SelectItem>
                                    <SelectItem value="greater_than">Mayor que</SelectItem>
                                    <SelectItem value="less_than">Menor que</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="conditionValue">Valor</Label>
                            <Input
                                id="conditionValue"
                                value={localData.value || ''}
                                onChange={(e) =>
                                    setLocalData({ ...localData, value: e.target.value })
                                }
                            />
                        </div>
                    </>
                );

            case 'delay':
                return (
                    <>
                        <div>
                            <Label htmlFor="delayLabel">Nombre del Delay</Label>
                            <Input
                                id="delayLabel"
                                value={localData.label || ''}
                                onChange={(e) =>
                                    setLocalData({ ...localData, label: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="delayAmount">Cantidad</Label>
                            <Input
                                id="delayAmount"
                                type="number"
                                value={localData.delay || 1}
                                onChange={(e) =>
                                    setLocalData({ ...localData, delay: parseInt(e.target.value) })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="delayUnit">Unidad</Label>
                            <Select
                                value={localData.unit || 'hours'}
                                onValueChange={(value) =>
                                    setLocalData({ ...localData, unit: value })
                                }
                            >
                                <SelectTrigger id="delayUnit">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="minutes">Minutos</SelectItem>
                                    <SelectItem value="hours">Horas</SelectItem>
                                    <SelectItem value="days">Días</SelectItem>
                                    <SelectItem value="weeks">Semanas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                );

            case 'end':
                return (
                    <div>
                        <Label htmlFor="endLabel">Nombre del Nodo Final</Label>
                        <Input
                            id="endLabel"
                            value={localData.label || ''}
                            onChange={(e) =>
                                setLocalData({ ...localData, label: e.target.value })
                            }
                        />
                    </div>
                );

            default:
                return <p className="text-sm text-gray-500">No hay configuración disponible</p>;
        }
    };

    return (
        <Card className="w-80 border-l border-gray-200 bg-white rounded-none h-full overflow-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="font-semibold text-gray-900">Configurar Nodo</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="p-4 space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Tipo de Nodo
                    </p>
                    <p className="font-medium text-gray-900 capitalize">
                        {selectedNode.type}
                    </p>
                </div>

                {renderConfigFields()}

                <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm" onClick={onClose} className="flex-1">
                        Cancelar
                    </Button>
                    <Button size="sm" onClick={handleSave} className="flex-1">
                        Guardar
                    </Button>
                </div>
            </div>
        </Card>
    );
}
