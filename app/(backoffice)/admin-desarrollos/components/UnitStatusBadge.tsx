import { Badge } from '@/components/ui/badge';

interface UnitStatusBadgeProps {
    status: 'available' | 'reserved' | 'sold' | 'blocked';
}

export function UnitStatusBadge({ status }: UnitStatusBadgeProps) {
    const getStyle = () => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200';
            case 'reserved':
                return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200';
            case 'sold':
                return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200';
            case 'blocked':
                return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getLabel = () => {
        switch (status) {
            case 'available':
                return 'Disponible';
            case 'reserved':
                return 'Reservado';
            case 'sold':
                return 'Vendido';
            case 'blocked':
                return 'Bloqueado';
            default:
                return status;
        }
    };

    return (
        <Badge variant="outline" className={`${getStyle()} capitalize`}>
            {getLabel()}
        </Badge>
    );
}
