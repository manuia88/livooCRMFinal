import { addDays, subDays, format } from 'date-fns';

// --- Broadcast (WhatsApp) Data ---

export interface WhatsAppTemplate {
    id: string;
    name: string;
    content: string;
    category: 'marketing' | 'utility' | 'authentication';
    status: 'approved' | 'pending' | 'rejected';
    language: string;
}

export const whatsappTemplates: WhatsAppTemplate[] = [
    {
        id: 'tmpl_01',
        name: 'livoo_welcome_v1',
        content: 'Hola {{1}}, bienvenido a Livoo. ¿En qué podemos ayudarte hoy?',
        category: 'utility',
        status: 'approved',
        language: 'es_MX',
    },
    {
        id: 'tmpl_02',
        name: 'property_alert_new',
        content: 'Hola {{1}}, tenemos una nueva propiedad en {{2}} que podría interesarte. Mira las fotos aquí: {{3}}',
        category: 'marketing',
        status: 'approved',
        language: 'es_MX',
    },
    {
        id: 'tmpl_03',
        name: 'appointment_reminder',
        content: 'Recordatorio: Tu visita a {{1}} es mañana a las {{2}}. Responde SI para confirmar.',
        category: 'utility',
        status: 'approved',
        language: 'es_MX',
    },
];

export interface BroadcastCampaign {
    id: string;
    name: string;
    templateId: string;
    sentAt: string;
    recipients: number;
    delivered: number;
    read: number;
    replied: number;
    status: 'completed' | 'scheduled' | 'draft';
}

export const broadcastHistory: BroadcastCampaign[] = [
    {
        id: 'bc_01',
        name: 'Lanzamiento Torre Virreyes',
        templateId: 'tmpl_02',
        sentAt: subDays(new Date(), 2).toISOString(),
        recipients: 450,
        delivered: 442,
        read: 380,
        replied: 45,
        status: 'completed',
    },
    {
        id: 'bc_02',
        name: 'Open House Polanco',
        templateId: 'tmpl_01',
        sentAt: subDays(new Date(), 5).toISOString(),
        recipients: 120,
        delivered: 118,
        read: 95,
        replied: 12,
        status: 'completed',
    },
];

// --- Email Marketing Data ---

export interface EmailCampaign {
    id: string;
    name: string;
    subject: string;
    sentAt: string;
    recipients: number;
    openRate: number;
    clickRate: number;
    status: 'draft' | 'scheduled' | 'sent';
    previewImage?: string;
}

export const emailCampaigns: EmailCampaign[] = [
    {
        id: 'em_01',
        name: 'Newsletter Febrero',
        subject: '🔥 Top 5 Propiedades de Lujo en CDMX',
        sentAt: subDays(new Date(), 10).toISOString(),
        recipients: 2500,
        openRate: 42.5,
        clickRate: 15.2,
        status: 'sent',
    },
    {
        id: 'em_02',
        name: 'Preventa Exclusiva',
        subject: 'Acceso anticipado: Torre Reforma',
        sentAt: addDays(new Date(), 2).toISOString(),
        recipients: 1200,
        openRate: 0,
        clickRate: 0,
        status: 'scheduled',
    },
];

// --- Social Planner Data ---

export interface SocialPost {
    id: string;
    content: string;
    channels: ('facebook' | 'instagram' | 'tiktok' | 'linkedin')[];
    scheduledFor: string;
    status: 'published' | 'scheduled' | 'draft';
    image?: string;
    likes?: number;
    comments?: number;
}

export const socialPosts: SocialPost[] = [
    {
        id: 'soc_01',
        content: '¡Nuevo listing en Polanco! 🏢 3 recámaras, vista panorámica. #RealEstate #CDMX #Lujo',
        channels: ['instagram', 'facebook'],
        scheduledFor: subDays(new Date(), 1).toISOString(),
        status: 'published',
        likes: 245,
        comments: 18,
    },
    {
        id: 'soc_02',
        content: '5 Tips para comprar tu primer departamento 🏠💡',
        channels: ['tiktok', 'instagram'],
        scheduledFor: addDays(new Date(), 1).toISOString(),
        status: 'scheduled',
    },
    {
        id: 'soc_03',
        content: 'Recorrido virtual: Loft en Condesa 🎥',
        channels: ['instagram'],
        scheduledFor: addDays(new Date(), 3).toISOString(),
        status: 'scheduled',
    },
];

// --- Ads Data ---

export interface AdCampaign {
    id: string;
    name: string;
    platform: 'facebook' | 'google';
    status: 'active' | 'paused';
    spend: number;
    impressions: number;
    clicks: number;
    leads: number;
    cpl: number; // Cost per Lead
    roas: number;
}

export const adCampaigns: AdCampaign[] = [
    {
        id: 'ad_01',
        name: 'Retargeting Website Visitors',
        platform: 'facebook',
        status: 'active',
        spend: 15400,
        impressions: 45000,
        clicks: 1200,
        leads: 85,
        cpl: 181,
        roas: 4.5,
    },
    {
        id: 'ad_02',
        name: 'Search - "Departamentos Polanco"',
        platform: 'google',
        status: 'active',
        spend: 22000,
        impressions: 12000,
        clicks: 850,
        leads: 42,
        cpl: 523,
        roas: 3.2,
    },
    {
        id: 'ad_03',
        name: 'Lead Gen Form - Inversionistas',
        platform: 'facebook',
        status: 'paused',
        spend: 5000,
        impressions: 15000,
        clicks: 300,
        leads: 50,
        cpl: 100,
        roas: 2.8,
    },
];
