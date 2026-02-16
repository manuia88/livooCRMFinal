'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Send, Check } from 'lucide-react';

interface ContactFormsProps {
    propertyId: string;
    propertyTitle: string;
}

export default function ContactForms({ propertyId, propertyTitle }: ContactFormsProps) {
    const [infoFormSubmitted, setInfoFormSubmitted] = useState(false);
    const [visitFormSubmitted, setVisitFormSubmitted] = useState(false);

    const handleInfoRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const lead = {
            id: `lead-${Date.now()}`,
            source: 'info_request',
            propertyId,
            propertyTitle,
            contactInfo: {
                name: formData.get('name') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string,
            },
            message: formData.get('message') as string,
            createdAt: new Date().toISOString(),
        };

        // Save to localStorage (future: API call)
        const leads = JSON.parse(localStorage.getItem('property_leads') || '[]');
        leads.push(lead);
        localStorage.setItem('property_leads', JSON.stringify(leads));

        setInfoFormSubmitted(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setInfoFormSubmitted(false);
            (e.target as HTMLFormElement).reset();
        }, 3000);
    };

    const handleVisitSchedule = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const lead = {
            id: `lead-${Date.now()}`,
            source: 'visit',
            propertyId,
            propertyTitle,
            contactInfo: {
                name: formData.get('visitName') as string,
                phone: formData.get('visitPhone') as string,
            },
            visitDate: formData.get('visitDate') as string,
            visitTime: formData.get('visitTime') as string,
            createdAt: new Date().toISOString(),
        };

        // Save to localStorage
        const leads = JSON.parse(localStorage.getItem('property_leads') || '[]');
        leads.push(lead);
        localStorage.setItem('property_leads', JSON.stringify(leads));

        setVisitFormSubmitted(true);

        setTimeout(() => {
            setVisitFormSubmitted(false);
            (e.target as HTMLFormElement).reset();
        }, 3000);
    };

    return (
        <div className="space-y-4">
            {/* Schedule Visit Form */}
            <Card className="p-4">
                <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-[var(--primary)]" />
                    Agendar Visita
                </h4>

                {visitFormSubmitted ? (
                    <div className="py-6 text-center">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-green-600">
                            ¡Visita agendada! Te contactaremos pronto.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleVisitSchedule} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label htmlFor="visitDate" className="text-xs">
                                    Fecha
                                </Label>
                                <Input
                                    id="visitDate"
                                    name="visitDate"
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="text-sm"
                                />
                            </div>
                            <div>
                                <Label htmlFor="visitTime" className="text-xs">
                                    Hora
                                </Label>
                                <Input
                                    id="visitTime"
                                    name="visitTime"
                                    type="time"
                                    required
                                    className="text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="visitName" className="text-xs">
                                Nombre
                            </Label>
                            <Input
                                id="visitName"
                                name="visitName"
                                required
                                placeholder="Tu nombre"
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="visitPhone" className="text-xs">
                                Teléfono
                            </Label>
                            <Input
                                id="visitPhone"
                                name="visitPhone"
                                type="tel"
                                required
                                placeholder="55 1234 5678"
                                className="text-sm"
                            />
                        </div>
                        <Button type="submit" className="w-full" size="sm">
                            Agendar Visita
                        </Button>
                    </form>
                )}
            </Card>

            {/* Request Info Form */}
            <Card className="p-4">
                <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <Send className="h-5 w-5 text-[var(--primary)]" />
                    Solicitar Información
                </h4>

                {infoFormSubmitted ? (
                    <div className="py-6 text-center">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-green-600">
                            ¡Mensaje enviado! Te responderemos pronto.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleInfoRequest} className="space-y-3">
                        <div>
                            <Label htmlFor="name" className="text-xs">
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                placeholder="Tu nombre"
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-xs">
                                Teléfono
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="55 1234 5678"
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-xs">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="tu@email.com"
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="message" className="text-xs">
                                Mensaje
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Cuéntanos qué te interesa..."
                                rows={3}
                                className="text-sm resize-none"
                            />
                        </div>
                        <Button type="submit" className="w-full" size="sm">
                            Enviar Información
                        </Button>
                    </form>
                )}
            </Card>
        </div>
    );
}
