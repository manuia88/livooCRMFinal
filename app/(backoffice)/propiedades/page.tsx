'use client';

import { useState } from 'react';
import { PageContainer, PageHeader } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  LayoutGrid,
  List,
  Map as MapIcon,
  Image as ImageIcon,
  Download,
  Share2,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Upload,
} from 'lucide-react';
import { mockProperties } from '@/lib/mock-data';

type ViewMode = 'grid' | 'list' | 'map' | 'gallery';

// Calculate Health Score (0-100%)
function calculateHealthScore(property: any): number {
  let score = 0;

  // Photos (20 pts)
  if (property.images && property.images.length > 0) {
    score += Math.min(20, property.images.length * 4);
  }

  // Description (20 pts)
  if (property.description && property.description.length > 50) {
    score += 20;
  } else if (property.description) {
    score += 10;
  }

  // Video (15 pts)
  if (property.hasVideo) score += 15;

  // Documents (10 pts)
  if (property.documents && property.documents.length > 0) {
    score += 10;
  }

  // Price set (10 pts)
  if (property.price) score += 10;

  // Features complete (15 pts)
  if (property.bedrooms && property.bathrooms && property.area) {
    score += 15;
  }

  // Address complete (10 pts)
  if (property.address && property.address.street && property.address.city) {
    score += 10;
  }

  return Math.min(100, score);
}

function getHealthScoreColor(score: number) {
  if (score >= 80) return 'text-green-600 bg-green-50';
  if (score >= 60) return 'text-amber-600 bg-amber-50';
  return 'text-red-600 bg-red-50';
}

function getHealthScoreIcon(score: number) {
  if (score >= 80) return CheckCircle2;
  if (score >= 60) return AlertCircle;
  return XCircle;
}

export default function PropiedadesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <PageContainer>
      <PageHeader
        title="Propiedades"
        description={`${mockProperties.length} propiedades en tu portafolio`}
        actions={
          <>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('map')}
              >
                <MapIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'gallery' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('gallery')}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Propiedad
            </Button>
          </>
        }
      />

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockProperties.slice(0, 9).map((property) => {
            const healthScore = calculateHealthScore(property);
            const HealthIcon = getHealthScoreIcon(healthScore);

            return (
              <Card key={property.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-[var(--bg-page)] relative">
                  <img
                    src={property.images?.[0] || '/placeholder-property.jpg'}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Health Score Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 ${getHealthScoreColor(healthScore)}`}>
                    <HealthIcon className="h-3.5 w-3.5" />
                    {healthScore}%
                  </div>
                  {/* Status Badge */}
                  {property.status && (
                    <Badge className="absolute top-3 left-3" variant={property.status === 'Disponible' ? 'default' : 'secondary'}>
                      {property.status}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[var(--text-primary)] line-clamp-1">
                      {property.title}
                    </h3>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-1">
                    {property.address?.neighborhood}, {property.address?.city}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-[var(--text-primary)]">
                      ${property.price?.toLocaleString()} {property.currency}
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

                  {/* Quick Actions */}
                  <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-3.5 w-3.5 mr-1.5" />
                      Ficha PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-3.5 w-3.5 mr-1.5" />
                      Compartir
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Upload className="h-3.5 w-3.5 mr-1.5" />
                      Publicar
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {mockProperties.slice(0, 10).map((property) => {
            const healthScore = calculateHealthScore(property);
            const HealthIcon = getHealthScoreIcon(healthScore);

            return (
              <Card key={property.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <img
                    src={property.images?.[0] || '/placeholder-property.jpg'}
                    alt={property.title}
                    className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[var(--text-primary)] truncate">
                            {property.title}
                          </h3>
                          <div className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${getHealthScoreColor(healthScore)}`}>
                            <HealthIcon className="h-3 w-3" />
                            {healthScore}%
                          </div>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mt-0.5 truncate">
                          {property.address?.neighborhood}, {property.address?.city}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-[var(--text-primary)]">
                          ${property.price?.toLocaleString()}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)]">
                          {property.area}m²
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                        <span>{property.bedrooms} rec</span>
                        <span>{property.bathrooms} baños</span>
                        <span>{property.parking} est</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3.5 w-3.5 mr-1.5" />
                          Ficha
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-3.5 w-3.5 mr-1.5" />
                          Publicar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <Card className="p-8">
          <div className="text-center py-12">
            <MapIcon className="h-16 w-16 text-[var(--text-tertiary)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Vista de Mapa
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              MapLibre GL con OpenFreeMap se integrará aquí. Mostrará todas las propiedades en un mapa interactivo con clustering y popups.
            </p>
            <Button className="mt-6">
              Implementar MapLibre GL
            </Button>
          </div>
        </Card>
      )}

      {/* Gallery View */}
      {viewMode === 'gallery' && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockProperties.slice(0, 12).map((property) => {
            const healthScore = calculateHealthScore(property);
            const HealthIcon = getHealthScoreIcon(healthScore);

            return (
              <Card key={property.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-[var(--bg-page)] relative cursor-pointer">
                  <img
                    src={property.images?.[0] || '/placeholder-property.jpg'}
                    alt={property.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center px-4">
                      <p className="font-semibold line-clamp-2 mb-1">{property.title}</p>
                      <p className="text-sm">${property.price?.toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Health Score */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-md font-semibold text-xs flex items-center gap-1 ${getHealthScoreColor(healthScore)}`}>
                    <HealthIcon className="h-3 w-3" />
                    {healthScore}%
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
