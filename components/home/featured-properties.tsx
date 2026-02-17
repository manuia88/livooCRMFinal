"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/property/property-card";

// Mock data - will be replaced with real data from API later
const mockProperties = [
    {
        id: "1",
        images: ["/property1.jpg", "/property1-2.jpg", "/property1-3.jpg"],
        title: "Departamento moderno en Polanco",
        price: 12000000,
        address: "Av. Masaryk 1500 - Polanco, CDMX",
        type: "Departamento",
        isNew: true,
        area: 185,
        bedrooms: 2,
        bathrooms: 2,
        parking: 2,
    },
    {
        id: "2",
        images: ["/property2.jpg", "/property2-2.jpg"],
        title: "Casa espaciosa en Lomas",
        price: 25000000,
        address: "Paseo de las Palmas 2000 - Lomas de Chapultepec, CDMX",
        type: "Casa",
        isNew: false,
        area: 480,
        bedrooms: 4,
        bathrooms: 4,
        parking: 3,
    },
    {
        id: "3",
        images: ["/property3.jpg"],
        title: "Studio moderno en Roma Norte",
        price: 4800000,
        address: "Calle Colima 500 - Roma Norte, CDMX",
        type: "Studio",
        isNew: true,
        area: 65,
        bedrooms: 1,
        bathrooms: 1,
        parking: 1,
    },
    {
        id: "4",
        images: ["/property4.jpg", "/property4-2.jpg", "/property4-3.jpg", "/property4-4.jpg"],
        title: "Loft de lujo en Condesa",
        price: 8500000,
        address: "Av. Ámsterdam 100 - Condesa, CDMX",
        type: "Loft",
        isNew: false,
        area: 120,
        bedrooms: 2,
        bathrooms: 2,
        parking: 2,
    },
];

const filterTabs = [
    "Nuevos",
    "3 recámaras",
    "+100m²",
    "Lofts",
    "Oportunidades",
];

export default function FeaturedProperties() {
    const [activeFilter, setActiveFilter] = useState("Nuevos");
    const router = useRouter();

    return (
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Descubre tu nuevo hogar
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Propiedades destacadas seleccionadas para ti
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex gap-3 min-w-max pb-2 md:pb-0">
                        {filterTabs.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeFilter === filter
                                    ? "bg-[#FF6B35] text-white shadow-md"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-10">
                    <Button
                        variant="outline"
                        className="px-8 py-6 border-2 border-[#FF6B35] text-[#FF6B35] rounded-xl font-semibold hover:bg-[#FFF4F0] transition-colors text-lg"
                        onClick={() => router.push('/buscar')}
                    >
                        Ver más propiedades
                    </Button>
                </div>
            </div>
        </section>
    );
}
