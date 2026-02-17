"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Home, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SearchModule() {
    const [activeTab, setActiveTab] = useState<"comprar" | "rentar">("comprar");
    const router = useRouter();

    const handleSearch = () => {
        const operation = activeTab === "rentar" ? "rent" : "sale";
        router.push(`/buscar?operation=${operation}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl w-full">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setActiveTab("comprar")}
                    className={`pb-3 px-4 font-semibold transition-colors relative ${activeTab === "comprar"
                        ? "text-[#FF6B35]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Comprar
                    {activeTab === "comprar" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("rentar")}
                    className={`pb-3 px-4 font-semibold transition-colors relative ${activeTab === "rentar"
                        ? "text-[#FF6B35]"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Rentar
                    {activeTab === "rentar" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />
                    )}
                </button>
            </div>

            {/* Search Form */}
            <div className="space-y-4">
                {/* Location Search */}
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Busque por calle, colonia o ciudad"
                        className="pl-11 h-12 text-base"
                    />
                </div>

                {/* Property Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select>
                        <SelectTrigger className="h-12">
                            <div className="flex items-center gap-2">
                                <Home className="h-4 w-4 text-gray-400" />
                                <SelectValue placeholder="Tipo de inmueble" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="departamento">Departamento</SelectItem>
                            <SelectItem value="casa">Casa</SelectItem>
                            <SelectItem value="terreno">Terreno</SelectItem>
                            <SelectItem value="oficina">Oficina</SelectItem>
                            <SelectItem value="todos">Todos</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="h-12">
                            <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-gray-400" />
                                <SelectValue placeholder="Recámaras" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 recámara</SelectItem>
                            <SelectItem value="2">2 recámaras</SelectItem>
                            <SelectItem value="3">3 recámaras</SelectItem>
                            <SelectItem value="4+">4+ recámaras</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Search Button */}
                <Button
                    size="lg"
                    className="w-full h-12 bg-[#FF6B35] hover:bg-[#E65A2B] text-white font-semibold text-base"
                    onClick={handleSearch}
                >
                    <Search className="mr-2 h-5 w-5" />
                    Buscar inmuebles
                </Button>

                {/* Alternative Search */}
                <Link href="/buscar" className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors mx-auto block text-center">
                    Búsqueda avanzada
                </Link>
            </div>
        </div>
    );
}
