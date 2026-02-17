'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface PDFExporterProps {
    elementId: string;
    filename: string;
    buttonText?: string;
    buttonVariant?: 'default' | 'outline' | 'ghost';
    buttonSize?: 'sm' | 'default' | 'lg';
}

export default function PDFExporter({
    elementId,
    filename,
    buttonText = 'Exportar PDF',
    buttonVariant = 'default',
    buttonSize = 'default',
}: PDFExporterProps) {
    const [isExporting, setIsExporting] = useState(false);

    const exportToPDF = async () => {
        setIsExporting(true);

        try {
            const element = document.getElementById(elementId);
            if (!element) {
                throw new Error(`Element with id "${elementId}" not found`);
            }

            // Capture the element as canvas with high quality
            const canvas = await html2canvas(element, {
                scale: 2, // High quality for retina displays
                useCORS: true, // Allow cross-origin images
                logging: false, // Disable console logs
                backgroundColor: '#ffffff', // White background
            });

            const imgData = canvas.toDataURL('image/png');

            // Calculate dimensions for A4 page
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            // Add first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Add additional pages if content is longer than one page
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            // Save the PDF
            pdf.save(`${filename}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor intenta de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Button
            variant={buttonVariant}
            size={buttonSize}
            onClick={exportToPDF}
            disabled={isExporting}
        >
            {isExporting ? (
                <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generando PDF...
                </>
            ) : (
                <>
                    <Download className="h-4 w-4 mr-2" />
                    {buttonText}
                </>
            )}
        </Button>
    );
}
