import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';

interface AgentCardProps {
    agent?: {
        name: string;
        photo: string;
        title: string;
        phone: string;
        whatsapp: string;
        rating?: number;
        reviews?: number;
    };
}

const defaultAgent = {
    name: 'Carlos López',
    photo: '/agents/agent-1.jpg',
    title: 'Asesor Inmobiliario',
    phone: '+52 55 1234 5678',
    whatsapp: '5512345678',
    rating: 4.8,
    reviews: 127,
};

export default function AgentCard({ agent = defaultAgent }: AgentCardProps) {
    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            'Hola, me interesa la propiedad que vi en Livoo. ¿Podrías darme más información?'
        );
        window.open(`https://wa.me/${agent.whatsapp}?text=${message}`, '_blank');
    };

    const handleCall = () => {
        window.location.href = `tel:${agent.phone}`;
    };

    return (
        <Card className="p-6">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                CONTACTA AL ASESOR
            </h3>

            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src={agent.photo}
                        alt={agent.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-primary)]">
                        {agent.name}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)]">{agent.title}</p>
                    {agent.rating && (
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{agent.rating}</span>
                            {agent.reviews && (
                                <span className="text-xs text-[var(--text-secondary)]">
                                    ({agent.reviews} reseñas)
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Button
                    onClick={handleCall}
                    className="w-full"
                    variant="outline"
                >
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar
                </Button>
                <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                </Button>
            </div>
        </Card>
    );
}
