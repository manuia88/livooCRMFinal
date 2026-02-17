'use client';

import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ReportCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    recentCount?: number;
}

export default function ReportCard({
    title,
    description,
    icon: Icon,
    href,
    recentCount = 0,
}: ReportCardProps) {
    return (
        <Card className="p-6 hover:shadow-lg transition-shadow relative">
            {recentCount > 0 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {recentCount}
                </div>
            )}

            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
                    <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{description}</p>

                    <Link href={href}>
                        <Button size="sm" className="w-full sm:w-auto">
                            Generar Reporte
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
