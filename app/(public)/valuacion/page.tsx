'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    Home,
    MapPin,
    Ruler,
    BedDouble,
    Bath,
    Car,
    Calendar,
    Star,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    TrendingUp,
    TrendingDown,
    Minus,
    Download,
} from 'lucide-react';
import { calculateValuation, formatCurrency, PropertyValuationInput } from '@/lib/utils/valuationCalculator';
import { ComparableProperty } from '@/lib/mock-data/comparables';

type Step = 1 | 2 | 3 | 4 | 5;

export default function ValuacionPage() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<Partial<PropertyValuationInput>>({
        amenidades: [],
    });
    const [result, setResult] = useState<ReturnType<typeof calculateValuation> | null>(null);

    const isStepComplete = (step: Step): boolean => {
        switch (step) {
            case 1:
                return !!(formData.tipo && formData.alcaldia && formData.colonia);
            case 2:
                return !!(formData.m2Construccion && formData.recamaras !== undefined && formData.banos !== undefined);
            case 3:
                return !!(formData.antiguedad !== undefined && formData.estado);
            case 4:
                return true; // Contact step (will capture in real app)
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (currentStep === 4) {
            // Calculate valuation
            const input: PropertyValuationInput = {
                tipo: formData.tipo!,
                alcaldia: formData.alcaldia!,
                colonia: formData.colonia!,
                m2Construccion: formData.m2Construccion!,
                recamaras: formData.recamaras!,
                banos: formData.banos!,
                estacionamientos: formData.estacionamientos || 0,
                antiguedad: formData.antiguedad!,
                estado: formData.estado!,
                amenidades: formData.amenidades || [],
                m2Terreno: formData.m2Terreno,
            };

            const valuationResult = calculateValuation(input);
            setResult(valuationResult);
            setCurrentStep(5);
        } else if (isStepComplete(currentStep)) {
            setCurrentStep((currentStep + 1) as Step);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as Step);
        }
    };

    const toggleAmenity = (amenity: string) => {
        const current = formData.amenidades || [];
        if (current.includes(amenity)) {
            setFormData({
                ...formData,
                amenidades: current.filter((a) => a !== amenity),
            });
        } else {
            setFormData({
                ...formData,
                amenidades: [...current, amenity],
            });
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-page)]">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                                Valuación Inteligente
                            </h1>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Conoce el valor de tu propiedad en minutos
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Progress Stepper */}
                {currentStep < 5 && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className="flex items-center flex-1">
                                    <div
                                        className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${step < currentStep
                                                ? 'bg-green-500 text-white'
                                                : step === currentStep
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'bg-gray-200 text-gray-500'
                                            }`}
                                    >
                                        {step < currentStep ? <CheckCircle2 className="h-6 w-6" /> : step}
                                    </div>
                                    {step < 4 && (
                                        <div
                                            className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-[var(--text-secondary)]">
                            <span>Ubicación</span>
                            <span>Detalles</span>
                            <span>Condición</span>
                            <span>Contacto</span>
                        </div>
                    </div>
                )}

                {/* Step 1: Property Type & Location */}
                {currentStep === 1 && (
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                            <MapPin className="h-6 w-6" />
                            Ubicación y Tipo de Propiedad
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Tipo de Propiedad *
                                </label>
                                <Select
                                    value={formData.tipo}
                                    onValueChange={(value) => setFormData({ ...formData, tipo: value as any })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Casa">Casa</SelectItem>
                                        <SelectItem value="Departamento">Departamento</SelectItem>
                                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                                        <SelectItem value="Loft">Loft</SelectItem>
                                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Alcaldía *
                                </label>
                                <Select
                                    value={formData.alcaldia}
                                    onValueChange={(value) => setFormData({ ...formData, alcaldia: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona alcaldía" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Miguel Hidalgo">Miguel Hidalgo</SelectItem>
                                        <SelectItem value="Cuauhtémoc">Cuauhtémoc</SelectItem>
                                        <SelectItem value="Benito Juárez">Benito Juárez</SelectItem>
                                        <SelectItem value="Coyoacán">Coyoacán</SelectItem>
                                        <SelectItem value="Cuajimalpa">Cuajimalpa</SelectItem>
                                        <SelectItem value="Álvaro Obregón">Álvaro Obregón</SelectItem>
                                        <SelectItem value="Gustavo A. Madero">Gustavo A. Madero</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Colonia *
                                </label>
                                <Input
                                    placeholder="Ej: Polanco, Roma Norte, Del Valle"
                                    value={formData.colonia || ''}
                                    onChange={(e) => setFormData({ ...formData, colonia: e.target.value })}
                                />
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 2: Property Details */}
                {currentStep === 2 && (
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                            <Ruler className="h-6 w-6" />
                            Detalles de la Propiedad
                        </h2>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                        M² Construcción *
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="120"
                                        value={formData.m2Construccion || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, m2Construccion: Number(e.target.value) })
                                        }
                                    />
                                </div>

                                {formData.tipo === 'Casa' && (
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                            M² Terreno
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="200"
                                            value={formData.m2Terreno || ''}
                                            onChange={(e) =>
                                                setFormData({ ...formData, m2Terreno: Number(e.target.value) })
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center gap-1">
                                        <BedDouble className="h-4 w-4" />
                                        Recámaras *
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="10"
                                        placeholder="3"
                                        value={formData.recamaras || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, recamaras: Number(e.target.value) })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center gap-1">
                                        <Bath className="h-4 w-4" />
                                        Baños *
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.5"
                                        placeholder="2"
                                        value={formData.banos || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, banos: Number(e.target.value) })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center gap-1">
                                        <Car className="h-4 w-4" />
                                        Estac.
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="10"
                                        placeholder="2"
                                        value={formData.estacionamientos || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, estacionamientos: Number(e.target.value) })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 3: Condition & Features */}
                {currentStep === 3 && (
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                            <Star className="h-6 w-6" />
                            Condición y Características
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Antigüedad (años) *
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="10"
                                    value={formData.antiguedad || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, antiguedad: Number(e.target.value) })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Estado de Conservación *
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {(['Excelente', 'Bueno', 'Regular', 'Necesita Remodelación'] as const).map((estado) => (
                                        <Button
                                            key={estado}
                                            type="button"
                                            variant={formData.estado === estado ? 'default' : 'outline'}
                                            onClick={() => setFormData({ ...formData, estado })}
                                            className="h-auto py-3"
                                        >
                                            {estado}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Amenidades (opcional)
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {[
                                        'Gym',
                                        'Alberca',
                                        'Roof Garden',
                                        'Seguridad 24/7',
                                        'Jardín',
                                        'Terraza',
                                        'Balcón',
                                        'Pet Friendly',
                                        'Jacuzzi Privado',
                                    ].map((amenity) => {
                                        const isSelected = formData.amenidades?.includes(amenity);
                                        return (
                                            <Badge
                                                key={amenity}
                                                variant={isSelected ? 'default' : 'outline'}
                                                className="cursor-pointer justify-center py-2"
                                                onClick={() => toggleAmenity(amenity)}
                                            >
                                                {isSelected && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                                {amenity}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Step 4: Contact Info (Mock) */}
                {currentStep === 4 && (
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                            Recibe tu Valuación
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            En una implementación real, aquí capturariamos nombre, email y teléfono del cliente antes de mostrar la valuación.
                        </p>
                        <div className="text-center py-8">
                            <div className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-full mb-4">
                                <CheckCircle2 className="h-5 w-5" />
                                <span className="font-semibold">Información Completa</span>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Click en "Ver Valuación" para obtener tu estimación
                            </p>
                        </div>
                    </Card>
                )}

                {/* Step 5: Results */}
                {currentStep === 5 && result && (
                    <div className="space-y-6">
                        {/* Main Result Card */}
                        <Card className="p-8 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white">
                            <div className="text-center">
                                <p className="text-sm opacity-90 mb-2">Valor Estimado de tu Propiedad</p>
                                <h2 className="text-5xl font-bold mb-2">
                                    {formatCurrency(result.estimatedValue)}
                                </h2>
                                <p className="text-sm opacity-90">
                                    Rango: {formatCurrency(result.minValue)} - {formatCurrency(result.maxValue)}
                                </p>
                                <Badge className="mt-4 bg-white/20 text-white border-white/30">
                                    Confianza: {result.confidence}
                                </Badge>
                            </div>
                        </Card>

                        {/* Market Insights */}
                        <Card className="p-6">
                            <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Información del Mercado
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-[var(--bg-page)] p-4 rounded-lg">
                                    <p className="text-xs text-[var(--text-secondary)] mb-1">Precio Promedio/m²</p>
                                    <p className="text-xl font-bold text-[var(--text-primary)]">
                                        ${result.marketInsights.avgPriceM2.toLocaleString('es-MX')}
                                    </p>
                                </div>
                                <div className="bg-[var(--bg-page)] p-4 rounded-lg">
                                    <p className="text-xs text-[var(--text-secondary)] mb-1">Tendencia 12 meses</p>
                                    <p className="text-xl font-bold flex items-center gap-2">
                                        {result.marketInsights.trend === 'up' && <TrendingUp className="h-5 w-5 text-green-500" />}
                                        {result.marketInsights.trend === 'down' && <TrendingDown className="h-5 w-5 text-red-500" />}
                                        {result.marketInsights.trend === 'stable' && <Minus className="h-5 w-5 text-gray-500" />}
                                        <span className={result.marketInsights.trend === 'up' ? 'text-green-600' : result.marketInsights.trend === 'down' ? 'text-red-600' : 'text-gray-600'}>
                                            {result.marketInsights.trendPercentage > 0 ? '+' : ''}
                                            {result.marketInsights.trendPercentage.toFixed(1)}%
                                        </span>
                                    </p>
                                </div>
                                <div className="bg-[var(--bg-page)] p-4 rounded-lg">
                                    <p className="text-xs text-[var(--text-secondary)] mb-1">Comparables Usados</p>
                                    <p className="text-xl font-bold text-[var(--text-primary)]">{result.comparables.length}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Comparables */}
                        {result.comparables.length > 0 && (
                            <Card className="p-6">
                                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                                    Propiedades Comparables
                                </h3>
                                <div className="space-y-3">
                                    {result.comparables.map((comp) => (
                                        <div key={comp.id} className="flex items-center justify-between p-4 bg-[var(--bg-page)] rounded-lg">
                                            <div className="flex-1">
                                                <p className="font-medium text-[var(--text-primary)]">
                                                    {comp.tipo} en {comp.colonia}
                                                </p>
                                                <p className="text-sm text-[var(--text-secondary)]">
                                                    {comp.m2Construccion}m² · {comp.recamaras} rec · {comp.banos} baños
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-[var(--text-primary)]">
                                                    {formatCurrency(comp.precio)}
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)]">
                                                    ${comp.precioM2.toLocaleString('es-MX')}/m²
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4">
                            <Button className="flex-1" size="lg">
                                <Download className="mr-2 h-5 w-5" />
                                Descargar Reporte PDF
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => {
                                setCurrentStep(1);
                                setFormData({ amenidades: [] });
                                setResult(null);
                            }}>
                                Nueva Valuación
                            </Button>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 5 && (
                    <div className="flex gap-4 mt-8">
                        {currentStep > 1 && (
                            <Button variant="outline" onClick={handleBack}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Atrás
                            </Button>
                        )}
                        <Button
                            className="flex-1"
                            onClick={handleNext}
                            disabled={!isStepComplete(currentStep)}
                        >
                            {currentStep === 4 ? 'Ver Valuación' : 'Continuar'}
                            {currentStep < 4 && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
