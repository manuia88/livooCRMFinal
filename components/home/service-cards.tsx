import { Building2, Home, CreditCard, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
    {
        icon: Building2,
        title: "Encuentra una agencia inmobiliaria",
        description: "Conecta con las mejores agencias de tu región",
        link: "/dashboard", // Point to dashboard/login
    },
    {
        icon: Home,
        title: "Vender o alquilar mi propiedad",
        description: "Publica tu inmueble de forma rápida y sencilla",
        link: "/valuacion", // Point to Valuation module
    },
    {
        icon: CreditCard,
        title: "Financia tu propiedad",
        description: "Encuentra las mejores opciones de financiamiento",
        link: "/dashboard", // Point to dashboard
    },
    {
        icon: Users,
        title: "Agencia inmobiliaria, únete a Loft",
        description: "Potencia tu negocio con nuestra tecnología",
        link: "/dashboard", // Point to dashboard
    },
];

export default function ServiceCards() {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#FF6B35]/30 transition-all duration-300 group"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-full bg-[#FFF4F0] flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors">
                                    <service.icon className="h-8 w-8 text-[#FF6B35] group-hover:text-white transition-colors" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* CTA Button */}
                                <Button
                                    variant="ghost"
                                    className="text-[#FF6B35] hover:bg-[#FFF4F0] font-medium"
                                    asChild
                                >
                                    <Link href={service.link}>
                                        Más información →
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
