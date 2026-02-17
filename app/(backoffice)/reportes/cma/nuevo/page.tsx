import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { FileBarChart } from 'lucide-react';
import CMAReport from '@/components/reports/CMAReport';

export default function NuevoCMAPage() {
    return (
        <PageContainer>
            <PageHeader
                title="Nuevo CMA"
                description="Análisis Comparative de Mercado"
                icon={FileBarChart}
            />

            <CMAReport />
        </PageContainer>
    );
}
