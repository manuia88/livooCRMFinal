'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FloorPlan } from '@/types/desarrollo';
import { Phone, Mail, MessageCircle, Calendar, Download } from 'lucide-react';

interface LeadCaptureFormProps {
    desarrolloId: string;
    desarrolloName: string;
    floorPlans: FloorPlan[];
    salesPhone: string;
}

export function LeadCaptureForm({ desarrolloId, desarrolloName, floorPlans, salesPhone }: LeadCaptureFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredUnit: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { desarrolloId, ...formData });
        // TODO: Implement form submission
        alert('¡Gracias! Un asesor se pondrá en contacto contigo pronto.');
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hola, me interesa ${desarrolloName}. ¿Podrían darme más información?`
        );
        window.open(`https://wa.me/${salesPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
    };

    return (
        <div className="space-y-4">
            {/* WhatsApp CTA */}
            <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="text-center mb-4">
                    <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">
                        ¿Prefieres WhatsApp?
                    </h4>
                    <p className="text-sm text-gray-600">
                        Chatea con un asesor ahora
                    </p>
                </div>

                <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Enviar WhatsApp
                </Button>
            </Card>

            {/* Lead Form */}
            <Card className="p-6">
                <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Solicita Información
                    </h4>
                    <p className="text-sm text-gray-600">
                        Completa el formulario y te contactaremos
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="55 1234 5678"
                            required
                        />
                    </div>

                    {/* Preferred Unit */}
                    <div>
                        <Label htmlFor="unit">Modelo de interés</Label>
                        <Select
                            value={formData.preferredUnit}
                            onValueChange={(value) => setFormData({ ...formData, preferredUnit: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un modelo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Cualquier modelo</SelectItem>
                                {floorPlans.map((plan) => (
                                    <SelectItem key={plan.id} value={plan.id}>
                                        {plan.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Message */}
                    <div>
                        <Label htmlFor="message">Mensaje (opcional)</Label>
                        <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="¿Tienes alguna pregunta específica?"
                            rows={3}
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full bg-[var(--loft-orange)] hover:bg-[var(--loft-orange-hover)]"
                        size="lg"
                    >
                        <Mail className="h-5 w-5 mr-2" />
                        Solicitar Información
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                        Al enviar tus datos aceptas nuestra política de privacidad
                    </p>
                </form>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="text-sm">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Agendar Visita
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                    <Download className="h-4 w-4 mr-1.5" />
                    Brochure PDF
                </Button>
            </div>

            {/* Contact Info */}
            <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">
                    ¿Prefieres llamar?
                </p>
                <a
                    href={`tel:${salesPhone}`}
                    className="inline-flex items-center gap-2 font-semibold text-[var(--loft-orange)] hover:underline"
                >
                    <Phone className="h-4 w-4" />
                    {salesPhone}
                </a>
            </div>
        </div>
    );
}
