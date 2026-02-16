'use client';

import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import DelayNode from './nodes/DelayNode';
import EndNode from './nodes/EndNode';

const nodeTypes: NodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
    condition: ConditionNode,
    delay: DelayNode,
    end: EndNode,
};

interface WorkflowCanvasProps {
    initialNodes?: Node[];
    initialEdges?: Edge[];
    onNodesChange?: (nodes: Node[]) => void;
    onEdgesChange?: (edges: Edge[]) => void;
    onNodeSelect?: (node: Node | null) => void;
}

export default function WorkflowCanvas({
    initialNodes = [],
    initialEdges = [],
    onNodesChange: onNodesChangeProp,
    onEdgesChange: onEdgesChangeProp,
    onNodeSelect,
}: WorkflowCanvasProps) {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const onConnect = useCallback(
        (params: Connection) => {
            const newEdge = addEdge(params, edges);
            setEdges(newEdge);
            onEdgesChangeProp?.(newEdge);
        },
        [edges, setEdges, onEdgesChangeProp]
    );

    const onNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            setSelectedNode(node);
            onNodeSelect?.(node);
        },
        [onNodeSelect]
    );

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
        onNodeSelect?.(null);
    }, [onNodeSelect]);

    // Handle nodes change with callback
    const handleNodesChange = useCallback(
        (changes: any) => {
            onNodesChange(changes);
            // Get updated nodes after change
            const updatedNodes = nodes; // This will be updated by useNodesState
            onNodesChangeProp?.(updatedNodes);
        },
        [onNodesChange, onNodesChangeProp, nodes]
    );

    // Handle edges change with callback
    const handleEdgesChange = useCallback(
        (changes: any) => {
            onEdgesChange(changes);
            const updatedEdges = edges;
            onEdgesChangeProp?.(updatedEdges);
        },
        [onEdgesChange, onEdgesChangeProp, edges]
    );

    return (
        <div ref={reactFlowWrapper} className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
                className="bg-gray-50"
            >
                <Background color="#94a3b8" gap={16} />
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
                                return '#64748b';
                        }
                    }}
                    maskColor="rgba(0, 0, 0, 0.1)"
                />
            </ReactFlow>
        </div>
    );
}
