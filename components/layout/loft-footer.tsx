import Link from "next/link";
import { Building2, PhoneCall, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function LoftFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Column 1: Corporate Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Building2 className="h-6 w-6 text-[#FF6B35]" />
                            <span className="text-xl font-bold text-white">LOFT</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Facilidad para comprar, vender o alquilar propiedades.
                        </p>
                    </div>

                    {/* Column 2: Apps */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Descarga la App</h3>
                        <div className="space-y-2">
                            <Link href="#" className="block text-sm hover:text-[#FF6B35] transition-colors">
                                Google Play
                            </Link>
                            <Link href="#" className="block text-sm hover:text-[#FF6B35] transition-colors">
                                App Store
                            </Link>
                        </div>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Contacto</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <PhoneCall className="h-4 w-4" />
                                <span>+55 11 4040-4040</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <FaWhatsapp className="h-4 w-4" />
                                <span>WhatsApp</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4" />
                                <span>contato@loft.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: About Loft */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Sobre Loft</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Centro de Ayuda</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Anunciar Inmueble</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Cómo Funciona</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Institucional</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Carreras</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Explore */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Explorar</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Guía de Venta</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Sitemap</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Calculadora</Link></li>
                        </ul>
                    </div>

                    {/* Column 6: Legal */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Privacidad</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Términos</Link></li>
                            <li><Link href="#" className="hover:text-[#FF6B35] transition-colors">Código de Conducta</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © 2026 Loft. Todos los derechos reservados.
                    </p>

                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                            <FaInstagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                            <FaLinkedin className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                            <FaFacebook className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/5511404040404"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all z-50"
                aria-label="WhatsApp"
            >
                <FaWhatsapp className="h-6 w-6" />
            </a>
        </footer>
    );
}
