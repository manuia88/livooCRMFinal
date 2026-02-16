'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Play, Download } from 'lucide-react';
import WorkflowCanvas from '@/components/automation/WorkflowCanvas';
import NodePalette from '@/components/automation/NodePalette';
import NodeConfigPanel from '@/components/automation/NodeConfigPanel';
import { workflowTemplates } from '@/lib/automation/workflowTemplates';
import { Node, Edge } from 'reactflow';

export default function NewWorkflowPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get('template');

    // Load template if provided
    const template = templateId
        ? workflowTemplates.find((t) => t.id === templateId)
        : null;

    const [workflowName, setWorkflowName] = useState(
        template?.name || 'Nueva Automatización'
    );
    const [nodes, setNodes] = useState<Node[]>(template?.nodes || []);
    const [edges, setEdges] = useState<Edge[]>(template?.edges || []);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [nextNodeId, setNextNodeId] = useState(
        template?.nodes.length ? template.nodes.length + 1 : 1
    );

    // Add node from palette
    const handleNodeAdd = useCallback(
        (nodeType: string, nodeData: any) => {
            const newNode: Node = {
                id: `node-${nextNodeId}`,
                type: nodeType,
                position: {
                    x: 250 + Math.random() * 100,
                    y: 100 + nodes.length * 150,
                },
                data: nodeData,
            };

            setNodes((nds) => [...nds, newNode]);
            setNextNodeId(nextNodeId + 1);
        },
        [nextNodeId, nodes.length]
    );

    // Update node data
    const handleNodeUpdate = useCallback(
        (nodeId: string, data: any) => {
            setNodes((nds) =>
                nds.map((node) => (node.id === nodeId ? { ...node, data } : node))
            );
        },
        []
    );

    // Save workflow
    const handleSave = () => {
        const workflow = {
            id: `wf-${Date.now()}`,
            name: workflowName,
            nodes,
            edges,
            status: 'draft',
            createdAt: new Date(),
        };

        // Save to localStorage (mock for now)
        const savedWorkflows = JSON.parse(
            localStorage.getItem('workflows') || '[]'
        );
        savedWorkflows.push(workflow);
        localStorage.setItem('workflows', JSON.stringify(savedWorkflows));

        // Navigate back
        router.push('/automatizaciones');
    };

    // Activate workflow
    const handleActivate = () => {
        const workflow = {
            id: `wf-${Date.now()}`,
            name: workflowName,
            nodes,
            edges,
            status: 'active',
            createdAt: new Date(),
        };

        const savedWorkflows = JSON.parse(
            localStorage.getItem('workflows') || '[]'
        );
        savedWorkflows.push(workflow);
        localStorage.setItem('workflows', JSON.stringify(savedWorkflows));

        router.push('/automatizaciones');
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/automatizaciones')}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                        <div className="border-l border-gray-300 h-6" />
                        <Input
                            value={workflowName}
                            onChange={(e) => setWorkflowName(e.target.value)}
                            className="font-semibold text-lg border-none shadow-none focus-visible:ring-0 w-96"
                            placeholder="Nombre del workflow"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-sm text-[var(--text-secondary)]">
                            {nodes.length} nodos, {edges.length} conexiones
                        </div>
                        <Button variant="outline" size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2" />
                            Guardar Borrador
                        </Button>
                        <Button size="sm" onClick={handleActivate}>
                            <Play className="h-4 w-4 mr-2" />
                            Guardar y Activar
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Node Palette */}
                <NodePalette onNodeAdd={handleNodeAdd} />

                {/* Canvas */}
                <div className="flex-1 relative">
                    {nodes.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <div className="text-center max-w-md">
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                                    Comienza tu automatización
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    Selecciona un nodo de tipo <strong>TRIGGER</strong> del panel
                                    izquierdo para comenzar tu flujo de trabajo
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                                    <p className="text-xs text-blue-900">
                                        <strong>💡 Tip:</strong> Los triggers son puntos de inicio.
                                        Un workflow debe empezar con un trigger (Nuevo Lead,
                                        Cumpleaños, etc.)
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <WorkflowCanvas
                            initialNodes={nodes}
                            initialEdges={edges}
                            onNodesChange={setNodes}
                            onEdgesChange={setEdges}
                            onNodeSelect={setSelectedNode}
                        />
                    )}
                </div>

                {/* Configuration Panel */}
                <NodeConfigPanel
                    selectedNode={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onUpdate={handleNodeUpdate}
                />
            </div>
        </div>
    );
}
