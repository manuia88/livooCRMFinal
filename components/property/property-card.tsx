"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BiBath, BiBed, BiCar, BiArea } from "react-icons/bi";

interface PropertyCardProps {
    property: {
        id: string;
        images: string[];
        title: string;
        price: number;
        address: string;
        type: string;
        isNew?: boolean;
        area: number;
        bedrooms: number;
        bathrooms: number;
        parking: number;
    };
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === property.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? property.images.length - 1 : prev - 1
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link href={`/propiedades/${property.id}`} className="block h-full">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col">
                {/* Image Carousel */}
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                        <>
                            <Image
                                src={property.images[currentImageIndex]}
                                alt={property.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Navigation Arrows */}
                            {property.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        aria-label="Imagen anterior"
                                    >
                                        <ChevronLeft className="h-5 w-5 text-gray-800" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        aria-label="Siguiente imagen"
                                    >
                                        <ChevronRight className="h-5 w-5 text-gray-800" />
                                    </button>

                                    {/* Image Indicators */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                        {property.images.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-1.5 rounded-full transition-all ${index === currentImageIndex
                                                    ? "w-6 bg-white"
                                                    : "w-1.5 bg-white/60"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <span className="text-gray-500">Sin imagen</span>
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                        {property.isNew && <Badge className="bg-[#FF6B35] hover:bg-[#E65A2B]">Nuevo</Badge>}
                        <Badge variant="secondary" className="bg-white/90 text-gray-800 hover:bg-white">{property.type}</Badge>
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsFavorite(!isFavorite);
                        }}
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-colors z-10"
                        aria-label="Agregar a favoritos"
                    >
                        <Heart
                            className={`h-5 w-5 ${isFavorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-700"
                                }`}
                        />
                    </button>

                    {/* Photo Counter */}
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium z-10">
                        {property.images.length} fotos
                    </div>
                </div>

                {/* Property Info */}
                <div className="p-4 flex flex-col flex-1">
                    {/* Price */}
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                        {formatPrice(property.price)}
                    </div>

                    {/* Address */}
                    <div className="text-sm text-gray-600 mb-3 line-clamp-1">
                        {property.address}
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-sm text-gray-700 mb-4 mt-auto">
                        <div className="flex items-center gap-1">
                            <BiArea className="h-4 w-4 text-gray-500" />
                            <span>{property.area}m²</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BiBed className="h-4 w-4 text-gray-500" />
                            <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BiBath className="h-4 w-4 text-gray-500" />
                            <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BiCar className="h-4 w-4 text-gray-500" />
                            <span>{property.parking}</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        variant="outline"
                        className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFF4F0]"
                    >
                        Ver detalles
                    </Button>
                </div>
            </div>
        </Link>
    );
}
