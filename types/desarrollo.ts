import { LucideIcon } from 'lucide-react';

export interface Address {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface FloorPlan {
    id: string;
    name: string;
    type: '1BR' | '2BR' | '3BR' | 'PH';
    bedrooms: number;
    bathrooms: number;
    area: number; // m²
    priceFrom: number;
    availableUnits: number;
    floorPlanImage: string;
    isPopular?: boolean;
}

export interface Amenity {
    name: string;
    icon: string; // Icon name from lucide-react
    image?: string;
    description?: string;
}

export interface Milestone {
    date: string;
    title: string;
    status: 'completed' | 'in-progress' | 'pending';
}

export interface SalesOffice {
    address: string;
    phone: string;
    email: string;
    hours: string;
}

export interface Desarrollo {
    id: string;
    slug: string;
    name: string;
    developer: string;

    // Location
    address: Address;

    // Overview
    description: string;
    tagline: string;
    totalUnits: number;
    availableUnits: number;
    priceFrom: number;
    priceTo: number;
    deliveryDate: string;
    constructionProgress: number; // 0-100%

    // Media
    coverImage: string;
    gallery: string[];
    virtualTour?: string;
    video?: string;

    // Floor Plans
    floorPlans: FloorPlan[];

    // Amenities
    amenities: Amenity[];

    // Features
    features: string[];

    // Timeline
    milestones: Milestone[];

    // Contact
    salesOffice: SalesOffice;

    // Status
    status: 'presale' | 'construction' | 'ready';
    soldPercentage: number;
}
