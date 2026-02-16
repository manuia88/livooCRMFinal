'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, MessageCircle, Facebook, Mail, Check } from 'lucide-react';

interface ShareButtonsProps {
    propertyTitle: string;
    propertyUrl: string;
}

export default function ShareButtons({ propertyTitle, propertyUrl }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent(
            `Mira esta increíble propiedad: ${propertyTitle}\n${propertyUrl}`
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const handleFacebookShare = () => {
        const url = encodeURIComponent(propertyUrl);
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const handleEmailShare = () => {
        const subject = encodeURIComponent(propertyTitle);
        const body = encodeURIComponent(
            `Te comparto esta propiedad que me pareció interesante:\n\n${propertyTitle}\n\n${propertyUrl}`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(propertyUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-secondary)] mr-2">Compartir:</span>

            <Button
                size="sm"
                variant="outline"
                onClick={handleWhatsAppShare}
                className="gap-2"
            >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
            </Button>

            <Button
                size="sm"
                variant="outline"
                onClick={handleFacebookShare}
                className="gap-2"
            >
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
            </Button>

            <Button
                size="sm"
                variant="outline"
                onClick={handleEmailShare}
                className="gap-2"
            >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
            </Button>

            <Button
                size="sm"
                variant="outline"
                onClick={handleCopyLink}
                className="gap-2"
            >
                {copied ? (
                    <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="hidden sm:inline text-green-600">Copiado</span>
                    </>
                ) : (
                    <>
                        <Share2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Copiar</span>
                    </>
                )}
            </Button>
        </div>
    );
}
