'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface MortgageCalculatorProps {
    propertyPrice: number;
}

export default function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [termYears, setTermYears] = useState(15);
    const interestRate = 9.5; // Fixed rate for Mexico

    const calculations = useMemo(() => {
        const downPayment = propertyPrice * (downPaymentPercent / 100);
        const loanAmount = propertyPrice - downPayment;
        const monthlyRate = interestRate / 12 / 100;
        const numPayments = termYears * 12;

        const monthlyPayment =
            loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1);

        const totalPayment = monthlyPayment * numPayments;
        const totalInterest = totalPayment - loanAmount;

        return {
            downPayment: Math.round(downPayment),
            loanAmount: Math.round(loanAmount),
            monthlyPayment: Math.round(monthlyPayment),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment),
        };
    }, [propertyPrice, downPaymentPercent, termYears, interestRate]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Card className="p-6 bg-gradient-to-br from-[var(--primary)]/5 to-white">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Calculadora de Crédito
            </h3>

            {/* Price Display */}
            <div className="mb-6">
                <div className="text-sm text-[var(--text-secondary)] mb-1">
                    Precio de venta
                </div>
                <div className="text-2xl font-bold text-[var(--primary)]">
                    {formatCurrency(propertyPrice)}
                </div>
            </div>

            {/* Down Payment Slider */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="downPayment" className="text-sm">
                        Enganche
                    </Label>
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                        {downPaymentPercent}% = {formatCurrency(calculations.downPayment)}
                    </span>
                </div>
                <Slider
                    id="downPayment"
                    min={10}
                    max={50}
                    step={5}
                    value={[downPaymentPercent]}
                    onValueChange={(value) => setDownPaymentPercent(value[0])}
                    className="mb-1"
                />
                <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                    <span>10%</span>
                    <span>50%</span>
                </div>
            </div>

            {/* Term Slider */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="term" className="text-sm">
                        Plazo
                    </Label>
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                        {termYears} años
                    </span>
                </div>
                <Slider
                    id="term"
                    min={5}
                    max={30}
                    step={5}
                    value={[termYears]}
                    onValueChange={(value) => setTermYears(value[0])}
                    className="mb-1"
                />
                <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                    <span>5 años</span>
                    <span>30 años</span>
                </div>
            </div>

            {/* Loan Amount */}
            <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="text-sm text-[var(--text-secondary)] mb-1">
                    Monto del crédito
                </div>
                <div className="text-lg font-semibold text-[var(--text-primary)]">
                    {formatCurrency(calculations.loanAmount)}
                </div>
            </div>

            {/* Monthly Payment - Highlighted */}
            <div className="bg-[var(--primary)] text-white p-4 rounded-lg mb-4">
                <div className="text-sm opacity-90 mb-1">Pago mensual estimado</div>
                <div className="text-3xl font-bold">
                    {formatCurrency(calculations.monthlyPayment)}
                </div>
                <div className="text-xs opacity-75 mt-1">
                    Tasa de interés: {interestRate}% anual
                </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Total a pagar:</span>
                    <span className="font-medium text-[var(--text-primary)]">
                        {formatCurrency(calculations.totalPayment)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Intereses totales:</span>
                    <span className="font-medium text-[var(--text-primary)]">
                        {formatCurrency(calculations.totalInterest)}
                    </span>
                </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-[var(--text-secondary)] mt-4 italic">
                *Cálculo estimado. Los montos reales pueden variar según la institución
                financiera y tu perfil crediticio.
            </p>
        </Card>
    );
}
