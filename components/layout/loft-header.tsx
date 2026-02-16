import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Menu } from "lucide-react";

export default function LoftHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Building2 className="h-8 w-8 text-[#FF6B35]" />
                    <span className="text-2xl font-bold text-gray-900">LOFT</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <div className="relative group">
                        <button className="text-gray-700 hover:text-[#FF6B35] font-medium transition-colors">
                            Comprar
                        </button>
                    </div>

                    <div className="relative group">
                        <button className="text-gray-700 hover:text-[#FF6B35] font-medium transition-colors">
                            Alugar
                        </button>
                    </div>

                    <div className="relative group">
                        <button className="text-gray-700 hover:text-[#FF6B35] font-medium transition-colors">
                            Vender
                        </button>
                    </div>

                    <div className="relative group">
                        <button className="text-gray-700 hover:text-[#FF6B35] font-medium transition-colors">
                            Para Imobiliárias
                        </button>
                    </div>

                    <div className="relative group">
                        <button className="text-gray-700 hover:text-[#FF6B35] font-medium transition-colors">
                            Um Loft
                        </button>
                    </div>

                    <Button
                        className="bg-[#FF6B35] hover:bg-[#E65A2B] text-white font-semibold px-6"
                    >
                        Entrar
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden">
                    <Menu className="h-6 w-6 text-gray-700" />
                </button>
            </div>
        </header>
    );
}
