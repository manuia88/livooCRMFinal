'use client';

import { useCallback } from 'react';
import {
    ReactFlow,
    Node,
    Edge,
    Controls,
    Background,
    addEdge,
    Connection,
    BackgroundVariant,
    MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import DelayNode from './nodes/DelayNode';
import EndNode from './nodes/EndNode';

const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
    condition: ConditionNode,
    delay: DelayNode,
    end: EndNode,
};

interface WorkflowCanvasProps {
    initialNodes: Node[];
    initialEdges: Edge[];
    onNodesChange: (nodes: Node[]) => void;
    onEdgesChange: (edges: Edge[]) => void;
    onNodeSelect?: (node: Node | null) => void;
}

export default function WorkflowCanvas({
    initialNodes,
    initialEdges,
    onNodesChange,
    onEdgesChange,
    onNodeSelect,
}: WorkflowCanvasProps) {
    // Handle node changes from ReactFlow
    const handleNodesChange = useCallback(
        (changes: any) => {
            // Apply changes and notify parent
            const applyNodeChanges = (nodes: Node[]) => {
                let updatedNodes = [...nodes];
                changes.forEach((change: any) => {
                    if (change.type === 'position' && change.position) {
                        updatedNodes = updatedNodes.map(node =>
                            node.id === change.id
                                ? { ...node, position: change.position }
                                : node
                        );
                    } else if (change.type === 'select') {
                        updatedNodes = updatedNodes.map(node =>
                            node.id === change.id
                                ? { ...node, selected: change.selected }
                                : node
                        );
                    } else if (change.type === 'remove') {
                        updatedNodes = updatedNodes.filter(node => node.id !== change.id);
                    }
                });
                return updatedNodes;
            };
            onNodesChange(applyNodeChanges(initialNodes));
        },
        [initialNodes, onNodesChange]
    );

    // Handle edge changes from ReactFlow
    const handleEdgesChange = useCallback(
        (changes: any) => {
            const applyEdgeChanges = (edges: Edge[]) => {
                let updatedEdges = [...edges];
                changes.forEach((change: any) => {
                    if (change.type === 'remove') {
                        updatedEdges = updatedEdges.filter(edge => edge.id !== change.id);
                    } else if (change.type === 'select') {
                        updatedEdges = updatedEdges.map(edge =>
                            edge.id === change.id
                                ? { ...edge, selected: change.selected }
                                : edge
                        );
                    }
                });
                return updatedEdges;
            };
            onEdgesChange(applyEdgeChanges(initialEdges));
        },
        [initialEdges, onEdgesChange]
    );

    // Handle connections
    const onConnect = useCallback(
        (params: Connection) => {
            const newEdge: Edge = {
                id: `e${params.source}-${params.target}`,
                source: params.source!,
                target: params.target!,
                sourceHandle: params.sourceHandle,
                targetHandle: params.targetHandle,
            };
            onEdgesChange([...initialEdges, newEdge]);
        },
        [initialEdges, onEdgesChange]
    );

    // Handle node click
    const onNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            onNodeSelect?.(node);
        },
        [onNodeSelect]
    );

    // Handle pane click (deselect)
    const onPaneClick = useCallback(() => {
        onNodeSelect?.(null);
    }, [onNodeSelect]);

    return (
        <div className="h-full w-full bg-gray-50">
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
            >
                <Controls />
                <MiniMap
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'trigger':
                                return '#22c55e';
                            case 'action':
                                return '#3b82f6';
                            case 'condition':
                                return '#eab308';
                            case 'delay':
                                return '#f97316';
                            case 'end':
                                return '#ef4444';
                            default:
                                return '#6b7280';
                        }
                    }}
                    className="!bg-white !border !border-gray-200"
                />
                <Background color="#e5e7eb" variant={BackgroundVariant.Dots} gap={16} />
            </ReactFlow>
        </div>
    );
}
