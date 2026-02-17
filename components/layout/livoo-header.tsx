import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Menu } from "lucide-react";

export default function LivooHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Building2 className="h-8 w-8 text-[#B8975A]" />
                    <span className="text-2xl font-bold text-[#2C3E2C]">LIVOO</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/buscar" className="text-[#556B55] hover:text-[#B8975A] font-medium transition-colors">
                        Comprar
                    </Link>

                    <Link href="/buscar?operation=rent" className="text-[#556B55] hover:text-[#B8975A] font-medium transition-colors">
                        Rentar
                    </Link>

                    <Link href="/valuacion" className="text-[#556B55] hover:text-[#B8975A] font-medium transition-colors">
                        Vender
                    </Link>

                    <Link href="/desarrollos" className="text-[#556B55] hover:text-[#B8975A] font-medium transition-colors">
                        Desarrollos
                    </Link>

                    <Link href="/dashboard" className="text-[#556B55] hover:text-[#B8975A] font-medium transition-colors">
                        Para Agencias
                    </Link>

                    <Button
                        className="bg-gradient-to-r from-[#B8975A] to-[#C4A872] hover:from-[#C4A872] hover:to-[#B8975A] text-white font-semibold px-6 rounded-xl shadow-lg"
                        asChild
                    >
                        <Link href="/dashboard">Entrar</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden">
                    <Menu className="h-6 w-6 text-[#556B55]" />
                </button>
            </div>
        </header>
    );
}
