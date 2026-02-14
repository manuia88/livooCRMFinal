"use client";

import { useState } from "react";
import PropertyCard from "@/components/property/property-card";

// Mock data - will be replaced with real data from API later
const mockProperties = [
    {
        id: "1",
        images: ["/property1.jpg", "/property1-2.jpg", "/property1-3.jpg"],
        title: "Apartamento moderno em Jardim Paulista",
        price: 1200000,
        address: "Rua Augusta, 1500 - Jardim Paulista, São Paulo - SP",
        type: "Apartamento",
        isNew: true,
        area: 85,
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
    },
    {
        id: "2",
        images: ["/property2.jpg", "/property2-2.jpg"],
        title: "Casa espaçosa em Pinheiros",
        price: 2500000,
        address: "Rua Teodoro Sampaio, 2000 - Pinheiros, São Paulo - SP",
        type: "Casa",
        isNew: false,
        area: 180,
        bedrooms: 3,
        bathrooms: 3,
        parking: 2,
    },
    {
        id: "3",
        images: ["/property3.jpg"],
        title: "Studio charmoso em Vila Madalena",
        price: 480000,
        address: "Rua Harmonia, 500 - Vila Madalena, São Paulo - SP",
        type: "Studio",
        isNew: true,
        area: 35,
        bedrooms: 1,
        bathrooms: 1,
        parking: 0,
    },
    {
        id: "4",
        images: ["/property4.jpg", "/property4-2.jpg", "/property4-3.jpg", "/property4-4.jpg"],
        title: "Loft de luxo em Itaim Bibi",
        price: 1800000,
        address: "Av. Juscelino Kubitschek, 1000 - Itaim Bibi, São Paulo - SP",
        type: "Loft",
        isNew: false,
        area: 120,
        bedrooms: 2,
        bathrooms: 2,
        parking: 2,
    },
];

const filterTabs = [
    "Novidades",
    "3 quartos",
    "A partir de 70m²",
    "Imóveis tipo loft",
    "Abaixo do valor de mercado",
];

export default function FeaturedProperties() {
    const [activeFilter, setActiveFilter] = useState("Novidades");

    return (
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Descubre tu nuevo hogar
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Imóveis em destaque selecionados para você
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex gap-3 min-w-max pb-2">
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
                    <button className="px-8 py-3 border-2 border-[#FF6B35] text-[#FF6B35] rounded-lg font-semibold hover:bg-[#FFF4F0] transition-colors">
                        Ver mais imóveis
                    </button>
                </div>
            </div>
        </section>
    );
}
