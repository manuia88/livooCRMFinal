import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, LayoutGrid, List, Map, Table } from 'lucide-react';
import { mockProperties } from '@/lib/mock-data';

export default function PropiedadesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Propiedades"
        description={`${mockProperties.length} propiedades en tu portafolio`}
        actions={
          <>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Map className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Table className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Propiedad
            </Button>
          </>
        }
      />

      {/* Property Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProperties.slice(0, 6).map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="aspect-video bg-[var(--bg-page)]">
              <img
                src={property.images[0]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[var(--text-primary)]">
                {property.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {property.address.neighborhood}, {property.address.city}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  ${property.price.toLocaleString()} {property.currency}
                </span>
                <span className="text-sm text-[var(--text-tertiary)]">
                  {property.area}m²
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span>{property.bedrooms} rec</span>
                <span>{property.bathrooms} baños</span>
                <span>{property.parking} est</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
