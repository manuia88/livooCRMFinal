export interface WorkflowTemplate {
    id: string;
    name: string;
    description: string;
    category: 'lead_nurturing' | 'customer_service' | 'sales' | 'marketing';
    trigger: {
        type: string;
        label: string;
    };
    nodes: any[];
    edges: any[];
}

export const workflowTemplates: WorkflowTemplate[] = [
    {
        id: 'template-1',
        name: 'Follow-up 48h después de lead',
        description: 'Envía mensaje automatizado 48h después de recibir un nuevo lead sin contacto',
        category: 'lead_nurturing',
        trigger: {
            type: 'new_lead',
            label: 'Nuevo Lead',
        },
        nodes: [
            {
                id: 'node-1',
                type: 'trigger',
                position: { x: 250, y: 50 },
                data: {
                    label: 'Nuevo Lead',
                    triggerType: 'new_lead',
                    description: 'Cuando se crea un nuevo lead en el sistema',
                },
            },
            {
                id: 'node-2',
                type: 'delay',
                position: { x: 250, y: 180 },
                data: {
                    label: 'Esperar 48 horas',
                    duration: 48,
                    unit: 'hours',
                    description: 'Dar tiempo para contacto manual',
                },
            },
            {
                id: 'node-3',
                type: 'condition',
                position: { x: 220, y: 310 },
                data: {
                    label: '¿Lead contactado?',
                    field: 'lastContactDate',
                    operator: '==',
                    value: 'null',
                    description: 'Verificar si ya fue contactado',
                },
            },
            {
                id: 'node-4',
                type: 'action',
                position: { x: 80, y: 480 },
                data: {
                    label: 'Enviar WhatsApp',
                    actionType: 'whatsapp',
                    description: 'Mensaje de seguimiento',
                    config: {
                        template: 'Hola {nombre}, vi que estás buscando propiedad en {zona}. ¿Te puedo ayudar?',
                    },
                },
            },
            {
                id: 'node-5',
                type: 'action',
                position: { x: 80, y: 630 },
                data: {
                    label: 'Crear Tarea',
                    actionType: 'create_task',
                    description: 'Asignar seguimiento al agente',
                    config: {
                        template: 'Llamar a {nombre} para seguimiento',
                        priority: 'P2',
                    },
                },
            },
            {
                id: 'node-6',
                type: 'end',
                position: { x: 370, y: 480 },
                data: {
                    label: 'Fin',
                },
            },
            {
                id: 'node-7',
                type: 'end',
                position: { x: 120, y: 780 },
                data: {
                    label: 'Fin',
                },
            },
        ],
        edges: [
            { id: 'e1-2', source: 'node-1', target: 'node-2' },
            { id: 'e2-3', source: 'node-2', target: 'node-3' },
            { id: 'e3-4', source: 'node-3', target: 'node-4', sourceHandle: 'true' },
            { id: 'e3-6', source: 'node-3', target: 'node-6', sourceHandle: 'false' },
            { id: 'e4-5', source: 'node-4', target: 'node-5' },
            { id: 'e5-7', source: 'node-5', target: 'node-7' },
        ],
    },
    {
        id: 'template-2',
        name: 'Felicitación cumpleaños cliente',
        description: 'Envía felicitación automática el día del cumpleaños del cliente',
        category: 'customer_service',
        trigger: {
            type: 'birthday',
            label: 'Cumpleaños Cliente',
        },
        nodes: [
            {
                id: 'node-1',
                type: 'trigger',
                position: { x: 250, y: 50 },
                data: {
                    label: 'Cumpleaños Cliente',
                    triggerType: 'birthday',
                    description: 'Día del cumpleaños del contacto',
                },
            },
            {
                id: 'node-2',
                type: 'action',
                position: { x: 250, y: 180 },
                data: {
                    label: 'Enviar WhatsApp',
                    actionType: 'whatsapp',
                    description: 'Mensaje de felicitación',
                    config: {
                        template: '¡Feliz cumpleaños {nombre}! 🎉🎂 Que tengas un día maravilloso.',
                    },
                },
            },
            {
                id: 'node-3',
                type: 'action',
                position: { x: 250, y: 310 },
                data: {
                    label: 'Agregar Tag',
                    actionType: 'add_tag',
                    description: 'Etiquetar para seguimiento',
                    config: {
                        tag: 'Birthday 2024',
                    },
                },
            },
            {
                id: 'node-4',
                type: 'end',
                position: { x: 270, y: 440 },
                data: {
                    label: 'Fin',
                },
            },
        ],
        edges: [
            { id: 'e1-2', source: 'node-1', target: 'node-2' },
            { id: 'e2-3', source: 'node-2', target: 'node-3' },
            { id: 'e3-4', source: 'node-3', target: 'node-4' },
        ],
    },
    {
        id: 'template-3',
        name: 'Alerta nueva propiedad',
        description: 'Notifica a leads cuando se publica propiedad en su zona de interés',
        category: 'marketing',
        trigger: {
            type: 'new_property',
            label: 'Nueva Propiedad',
        },
        nodes: [
            {
                id: 'node-1',
                type: 'trigger',
                position: { x: 250, y: 50 },
                data: {
                    label: 'Nueva Propiedad',
                    triggerType: 'new_property',
                    description: 'Cuando se publica nueva propiedad',
                },
            },
            {
                id: 'node-2',
                type: 'condition',
                position: { x: 220, y: 180 },
                data: {
                    label: '¿Zona de interés?',
                    field: 'property.zone',
                    operator: '==',
                    value: 'lead.preferredZone',
                    description: 'Verificar match de zona',
                },
            },
            {
                id: 'node-3',
                type: 'action',
                position: { x: 80, y: 350 },
                data: {
                    label: 'Enviar Email',
                    actionType: 'email',
                    description: 'Alerta con detalles',
                    config: {
                        template: 'Nueva propiedad en {zona}: {direccion} - ${precio}',
                    },
                },
            },
            {
                id: 'node-4',
                type: 'action',
                position: { x: 80, y: 500 },
                data: {
                    label: 'Enviar WhatsApp',
                    actionType: 'whatsapp',
                    description: 'Link a la propiedad',
                    config: {
                        template: 'Te puede interesar: {propertyLink}',
                    },
                },
            },
            {
                id: 'node-5',
                type: 'end',
                position: { x: 370, y: 350 },
                data: {
                    label: 'Fin',
                },
            },
            {
                id: 'node-6',
                type: 'end',
                position: { x: 120, y: 650 },
                data: {
                    label: 'Fin',
                },
            },
        ],
        edges: [
            { id: 'e1-2', source: 'node-1', target: 'node-2' },
            { id: 'e2-3', source: 'node-2', target: 'node-3', sourceHandle: 'true' },
            { id: 'e2-5', source: 'node-2', target: 'node-5', sourceHandle: 'false' },
            { id: 'e3-4', source: 'node-3', target: 'node-4' },
            { id: 'e4-6', source: 'node-4', target: 'node-6' },
        ],
    },
    {
        id: 'template-4',
        name: 'Recordatorio visita próxima',
        description: 'Recuerda al cliente visita programada 24h antes',
        category: 'sales',
        trigger: {
            type: 'time_based',
            label: 'Visita Programada',
        },
        nodes: [
            {
                id: 'node-1',
                type: 'trigger',
                position: { x: 250, y: 50 },
                data: {
                    label: 'Visita Programada',
                    triggerType: 'time_based',
                    description: '24h antes de visita',
                },
            },
            {
                id: 'node-2',
                type: 'action',
                position: { x: 250, y: 180 },
                data: {
                    label: 'Enviar WhatsApp',
                    actionType: 'whatsapp',
                    description: 'Recordatorio de visita',
                    config: {
                        template:
                            'Hola {nombre}, te recuerdo tu visita mañana a las {hora} en {direccion}. ¡Te esperamos!',
                    },
                },
            },
            {
                id: 'node-3',
                type: 'action',
                position: { x: 250, y: 310 },
                data: {
                    label: 'Notificación Agente',
                    actionType: 'notification',
                    description: 'Avisar al agente',
                    config: {
                        template: 'Visita confirmada con {nombre} mañana',
                    },
                },
            },
            {
                id: 'node-4',
                type: 'end',
                position: { x: 270, y: 440 },
                data: {
                    label: 'Fin',
                },
            },
        ],
        edges: [
            { id: 'e1-2', source: 'node-1', target: 'node-2' },
            { id: 'e2-3', source: 'node-2', target: 'node-3' },
            { id: 'e3-4', source: 'node-3', target: 'node-4' },
        ],
    },
    {
        id: 'template-5',
        name: 'Reactivación lead inactivo',
        description: 'Intenta reactivar leads sin contacto por 30 días',
        category: 'lead_nurturing',
        trigger: {
            type: 'time_based',
            label: '30 días sin contacto',
        },
        nodes: [
            {
                id: 'node-1',
                type: 'trigger',
                position: { x: 250, y: 50 },
                data: {
                    label: '30 días sin contacto',
                    triggerType: 'time_based',
                    description: 'Lead inactivo por 30 días',
                },
            },
            {
                id: 'node-2',
                type: 'action',
                position: { x: 250, y: 180 },
                data: {
                    label: 'Enviar Email',
                    actionType: 'email',
                    description: 'Email de reactivación',
                    config: {
                        template: 'Hola {nombre}, ¿Sigues buscando propiedad? Tenemos nuevas opciones.',
                    },
                },
            },
            {
                id: 'node-3',
                type: 'delay',
                position: { x: 250, y: 310 },
                data: {
                    label: 'Esperar 7 días',
                    duration: 7,
                    unit: 'days',
                    description: 'Dar tiempo de respuesta',
                },
            },
            {
                id: 'node-4',
                type: 'condition',
                position: { x: 220, y: 440 },
                data: {
                    label: '¿Respondió?',
                    field: 'emailOpened',
                    operator: '==',
                    value: 'true',
                    description: 'Email abierto o respondido',
                },
            },
            {
                id: 'node-5',
                type: 'action',
                position: { x: 80, y: 610 },
                data: {
                    label: 'Asignar Agente',
                    actionType: 'assign_agent',
                    description: 'Seguimiento manual',
                    config: {
                        autoAssign: true,
                    },
                },
            },
            {
                id: 'node-6',
                type: 'action',
                position: { x: 320, y: 610 },
                data: {
                    label: 'Marcar como Inactivo',
                    actionType: 'update_field',
                    description: 'Cambiar estado',
                    config: {
                        field: 'status',
                        value: 'inactive',
                    },
                },
            },
            {
                id: 'node-7',
                type: 'end',
                position: { x: 120, y: 760 },
                data: {
                    label: 'Fin',
                },
            },
            {
                id: 'node-8',
                type: 'end',
                position: { x: 360, y: 760 },
                data: {
                    label: 'Fin',
                },
            },
        ],
        edges: [
            { id: 'e1-2', source: 'node-1', target: 'node-2' },
            { id: 'e2-3', source: 'node-2', target: 'node-3' },
            { id: 'e3-4', source: 'node-3', target: 'node-4' },
            { id: 'e4-5', source: 'node-4', target: 'node-5', sourceHandle: 'true' },
            { id: 'e4-6', source: 'node-4', target: 'node-6', sourceHandle: 'false' },
            { id: 'e5-7', source: 'node-5', target: 'node-7' },
            { id: 'e6-8', source: 'node-6', target: 'node-8' },
        ],
    },
];
