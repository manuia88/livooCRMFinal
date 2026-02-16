'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { Node } from 'reactflow';

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
    const [config, setConfig] = useState<any>(selectedNode?.data.config || {});

    if (!selectedNode) {
        return (
            <div className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center">
                <p className="text-sm text-[var(--text-secondary)] text-center">
                    Selecciona un nodo para configurarlo
                </p>
            </div>
        );
    }

    const handleSave = () => {
        onUpdate(selectedNode.id, { ...selectedNode.data, config });
    };

    const renderActionConfig = () => {
        const actionType = selectedNode.data.actionType;

        switch (actionType) {
            case 'whatsapp':
            case 'email':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="template">Mensaje</Label>
                            <Textarea
                                id="template"
                                placeholder="Hola {nombre}, ..."
                                value={config.template || ''}
                                onChange={(e) =>
                                    setConfig({ ...config, template: e.target.value })
                                }
                                rows={4}
                                className="mt-1"
                            />
                            <p className="text-xs text-[var(--text-secondary)] mt-1">
                                Variables disponibles: {'{nombre}'}, {'{zona}'}, {'{precio}'}
                            </p>
                        </div>
                    </div>
                );

            case 'create_task':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="taskTitle">Título de Tarea</Label>
                            <Input
                                id="taskTitle"
                                placeholder="Llamar a {nombre}"
                                value={config.template || ''}
                                onChange={(e) =>
                                    setConfig({ ...config, template: e.target.value })
                                }
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="priority">Prioridad</Label>
                            <Select
                                value={config.priority || 'P2'}
                                onValueChange={(value) =>
                                    setConfig({ ...config, priority: value })
                                }
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="P1">P1 - Urgente</SelectItem>
                                    <SelectItem value="P2">P2 - Alta</SelectItem>
                                    <SelectItem value="P3">P3 - Media</SelectItem>
                                    <SelectItem value="P4">P4 - Baja</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );

            case 'add_tag':
                return (
                    <div>
                        <Label htmlFor="tag">Etiqueta</Label>
                        <Input
                            id="tag"
                            placeholder="Birthday 2024"
                            value={config.tag || ''}
                            onChange={(e) => setConfig({ ...config, tag: e.target.value })}
                            className="mt-1"
                        />
                    </div>
                );

            case 'assign_agent':
                return (
                    <div>
                        <Label htmlFor="agent">Asignar a</Label>
                        <Select
                            value={config.agentId || 'auto'}
                            onValueChange={(value) =>
                                setConfig({ ...config, agentId: value })
                            }
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="auto">Automático (Round-robin)</SelectItem>
                                <SelectItem value="agent-1">Juan Pérez</SelectItem>
                                <SelectItem value="agent-2">María García</SelectItem>
                                <SelectItem value="agent-3">Carlos López</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                );

            case 'update_field':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="field">Campo</Label>
                            <Select
                                value={config.field || ''}
                                onValueChange={(value) => setConfig({ ...config, field: value })}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="status">Estado</SelectItem>
                                    <SelectItem value="source">Fuente</SelectItem>
                                    <SelectItem value="urgency">Urgencia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="value">Valor</Label>
                            <Input
                                id="value"
                                placeholder="nuevo valor"
                                value={config.value || ''}
                                onChange={(e) => setConfig({ ...config, value: e.target.value })}
                                className="mt-1"
                            />
                        </div>
                    </div>
                );

            case 'notification':
                return (
                    <div>
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea
                            id="message"
                            placeholder="Notificación interna..."
                            value={config.template || ''}
                            onChange={(e) =>
                                setConfig({ ...config, template: e.target.value })
                            }
                            rows={3}
                            className="mt-1"
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    const renderConditionConfig = () => {
        return (
            <div className="space-y-4">
                <div>
                    <Label htmlFor="field">Campo a Evaluar</Label>
                    <Select
                        value={selectedNode.data.field || ''}
                        onValueChange={(value) =>
                            onUpdate(selectedNode.id, { ...selectedNode.data, field: value })
                        }
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="lastContactDate">Última fecha contacto</SelectItem>
                            <SelectItem value="budget">Presupuesto</SelectItem>
                            <SelectItem value="urgency">Urgencia</SelectItem>
                            <SelectItem value="zone">Zona</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="operator">Operador</Label>
                    <Select
                        value={selectedNode.data.operator || '=='}
                        onValueChange={(value) =>
                            onUpdate(selectedNode.id, { ...selectedNode.data, operator: value })
                        }
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="==">Igual a (==)</SelectItem>
                            <SelectItem value="!=">Diferente de (!=)</SelectItem>
                            <SelectItem value=">">Mayor que (&gt;)</SelectItem>
                            <SelectItem value="<">Menor que (&lt;)</SelectItem>
                            <SelectItem value="contains">Contiene</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="value">Valor</Label>
                    <Input
                        id="value"
                        placeholder="valor a comparar"
                        value={selectedNode.data.value || ''}
                        onChange={(e) =>
                            onUpdate(selectedNode.id, { ...selectedNode.data, value: e.target.value })
                        }
                        className="mt-1"
                    />
                </div>
            </div>
        );
    };

    const renderDelayConfig = () => {
        return (
            <div className="space-y-4">
                <div>
                    <Label htmlFor="duration">Duración</Label>
                    <Input
                        id="duration"
                        type="number"
                        min="1"
                        placeholder="48"
                        value={selectedNode.data.duration || ''}
                        onChange={(e) =>
                            onUpdate(selectedNode.id, {
                                ...selectedNode.data,
                                duration: parseInt(e.target.value),
                            })
                        }
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="unit">Unidad</Label>
                    <Select
                        value={selectedNode.data.unit || 'hours'}
                        onValueChange={(value) =>
                            onUpdate(selectedNode.id, { ...selectedNode.data, unit: value })
                        }
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="minutes">Minutos</SelectItem>
                            <SelectItem value="hours">Horas</SelectItem>
                            <SelectItem value="days">Días</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        );
    };

    return (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                        Configuración del Nodo
                    </h3>
                    <Button size="sm" variant="ghost" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Node Label */}
                <div className="mb-4">
                    <Label htmlFor="label">Nombre del Nodo</Label>
                    <Input
                        id="label"
                        value={selectedNode.data.label}
                        onChange={(e) =>
                            onUpdate(selectedNode.id, {
                                ...selectedNode.data,
                                label: e.target.value,
                            })
                        }
                        className="mt-1"
                    />
                </div>

                {/* Node Description */}
                <div className="mb-4">
                    <Label htmlFor="description">Descripción</Label>
                    <Input
                        id="description"
                        placeholder="Breve descripción..."
                        value={selectedNode.data.description || ''}
                        onChange={(e) =>
                            onUpdate(selectedNode.id, {
                                ...selectedNode.data,
                                description: e.target.value,
                            })
                        }
                        className="mt-1"
                    />
                </div>

                {/* Type-specific Configuration */}
                <div className="mb-6">
                    {selectedNode.type === 'action' && renderActionConfig()}
                    {selectedNode.type === 'condition' && renderConditionConfig()}
                    {selectedNode.type === 'delay' && renderDelayConfig()}
                </div>

                {/* Save Button */}
                {selectedNode.type === 'action' && (
                    <Button onClick={handleSave} className="w-full">
                        Guardar Configuración
                    </Button>
                )}
            </div>
        </div>
    );
}
