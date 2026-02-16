'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
    propertyTitle: string;
    phoneNumber?: string;
}

export default function WhatsAppButton({
    propertyTitle,
    phoneNumber = '5512345678',
}: WhatsAppButtonProps) {
    const handleClick = () => {
        const message = encodeURIComponent(
            `Hola, me interesa ${propertyTitle}. ¿Podrías darme más información?`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <Button
            className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 gap-2"
            onClick={handleClick}
        >
            <MessageCircle className="h-5 w-5" />
            Contactar por WhatsApp
        </Button>
    );
}
