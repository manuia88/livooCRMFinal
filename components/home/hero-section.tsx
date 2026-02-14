import SearchModule from "@/components/search/search-module";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-r from-[#2C3E2C] via-[#556B55] to-[#2C3E2C] text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-72 h-72 bg-[#B8975A] rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C4A872] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text + Search */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Tu hogar ideal en las mejores colonias de CDMX
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 max-w-xl">
                                Expertos en Benito Juárez, Cuauhtémoc y Miguel Hidalgo. Compra, vende o renta con asesoría personalizada y tecnología.
                            </p>
                        </div>

                        {/* Search Module */}
                        <div className="pt-4">
                            <SearchModule />
                        </div>
                    </div>

                    {/* Right: Hero Image */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl" />
                            <Image
                                src="/hero-couple.jpg"
                                alt="Pareja feliz con llaves de su nuevo hogar"
                                width={500}
                                height={500}
                                className="relative z-10 rounded-3xl shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="#F8F7F4"
                    />
                </svg>
            </div>
        </section>
    );
}
