'use client';

import { useEffect, useRef, useState } from 'react';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    GeolocateControl,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Property } from '@/types';
import { MapPin, Home, Building2, BedDouble, Bath, Car } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PropertyMapProps {
    properties: Property[];
    selectedPropertyId?: string;
    onPropertyClick?: (propertyId: string) => void;
    onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
}

export default function PropertyMap({
    properties,
    selectedPropertyId,
    onPropertyClick,
    onBoundsChange,
}: PropertyMapProps) {
    const mapRef = useRef<any>(null);
    const [popupInfo, setPopupInfo] = useState<Property | null>(null);
    const [viewState, setViewState] = useState({
        longitude: -99.1332,
        latitude: 19.4326,
        zoom: 11,
    });

    // OpenFreeMap tile source (100% free, no API key)
    const mapStyle = 'https://tiles.openfreemap.org/styles/liberty';

    // Handle map move to update visible properties
    const handleMoveEnd = () => {
        if (!mapRef.current || !onBoundsChange) return;

        const map = mapRef.current.getMap();
        const bounds = map.getBounds();

        onBoundsChange({
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
        });
    };

    // Fly to property when selected externally
    useEffect(() => {
        if (selectedPropertyId && mapRef.current) {
            const property = properties.find((p) => p.id === selectedPropertyId);
            if (property && property.address.lat && property.address.lng) {
                mapRef.current.flyTo({
                    center: [property.address.lng, property.address.lat],
                    zoom: 15,
                    duration: 1000,
                });
                setPopupInfo(property);
            }
        }
    }, [selectedPropertyId, properties]);

    // Format price for display
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        }
        return `$${(price / 1000).toLocaleString('es-MX')}`;
    };

    // Get marker color by property type
    const getMarkerColor = (type: string) => {
        const colors: Record<string, string> = {
            casa: '#3B82F6', // blue
            departamento: '#10B981', // green
            oficina: '#8B5CF6', // purple
            terreno: '#F59E0B', // amber
            local: '#EF4444', // red
            bodega: '#6B7280', // gray
        };
        return colors[type] || '#10B981';
    };

    // Get property type icon
    const getTypeIcon = (type: string) => {
        if (type === 'casa') return Home;
        if (type === 'departamento') return Building2;
        return Building2;
    };

    return (
        <div className="relative h-full w-full">
            <Map
                ref={mapRef}
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                onMoveEnd={handleMoveEnd}
                mapStyle={mapStyle}
                style={{ width: '100%', height: '100%' }}
                attributionControl={false}
            >
                {/* Map Controls */}
                <NavigationControl position="top-right" />
                <FullscreenControl position="top-right" />
                <GeolocateControl
                    position="top-right"
                    trackUserLocation
                    showUserLocation
                />

                {/* Property Markers */}
                {properties.map((property) => {
                    if (!property.address.lat || !property.address.lng) return null;

                    const isSelected = property.id === selectedPropertyId;
                    const color = getMarkerColor(property.type);
                    const TypeIcon = getTypeIcon(property.type);

                    return (
                        <Marker
                            key={property.id}
                            longitude={property.address.lng}
                            latitude={property.address.lat}
                            anchor="bottom"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setPopupInfo(property);
                                onPropertyClick?.(property.id);
                            }}
                        >
                            <div
                                className={`cursor-pointer transition-all duration-200 ${isSelected ? 'scale-125' : 'hover:scale-110'
                                    }`}
                                style={{
                                    filter: isSelected
                                        ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))'
                                        : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))',
                                }}
                            >
                                {/* Price Badge */}
                                <div
                                    className="px-2 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap mb-1"
                                    style={{ backgroundColor: color }}
                                >
                                    {formatPrice(property.price)}
                                </div>
                                {/* Map Pin */}
                                <div className="flex justify-center">
                                    <MapPin
                                        className="h-8 w-8"
                                        style={{ color, fill: color }}
                                        strokeWidth={1.5}
                                    />
                                </div>
                            </div>
                        </Marker>
                    );
                })}

                {/* Popup */}
                {popupInfo && popupInfo.address.lat && popupInfo.address.lng && (
                    <Popup
                        longitude={popupInfo.address.lng}
                        latitude={popupInfo.address.lat}
                        anchor="top"
                        onClose={() => setPopupInfo(null)}
                        closeButton={true}
                        closeOnClick={false}
                        className="property-popup"
                    >
                        <div className="p-2 min-w-[280px]">
                            {/* Property Image */}
                            {popupInfo.images && popupInfo.images[0] && (
                                <img
                                    src={popupInfo.images[0]}
                                    alt={popupInfo.title}
                                    className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                            )}

                            {/* Type Badge */}
                            <Badge variant="outline" className="mb-2 capitalize">
                                {popupInfo.type}
                            </Badge>

                            {/* Title */}
                            <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1 line-clamp-2">
                                {popupInfo.title}
                            </h3>

                            {/* Location */}
                            <p className="text-xs text-[var(--text-secondary)] mb-2 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {popupInfo.address.neighborhood}, {popupInfo.address.state}
                            </p>

                            {/* Price */}
                            <p className="text-lg font-bold text-[var(--primary)] mb-3">
                                {formatPrice(popupInfo.price)}{' '}
                                <span className="text-xs font-normal text-[var(--text-secondary)]">
                                    {popupInfo.currency}
                                </span>
                            </p>

                            {/* Specs */}
                            <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-3">
                                {popupInfo.area > 0 && (
                                    <span>{popupInfo.area}m²</span>
                                )}
                                {popupInfo.bedrooms > 0 && (
                                    <span className="flex items-center gap-1">
                                        <BedDouble className="h-3 w-3" />
                                        {popupInfo.bedrooms}
                                    </span>
                                )}
                                {popupInfo.bathrooms > 0 && (
                                    <span className="flex items-center gap-1">
                                        <Bath className="h-3 w-3" />
                                        {popupInfo.bathrooms}
                                    </span>
                                )}
                                {popupInfo.parking > 0 && (
                                    <span className="flex items-center gap-1">
                                        <Car className="h-3 w-3" />
                                        {popupInfo.parking}
                                    </span>
                                )}
                            </div>

                            {/* View Button */}
                            <Button
                                size="sm"
                                className="w-full"
                                onClick={() => {
                                    // TODO: Navigate to property detail when implemented
                                    console.log('View property:', popupInfo.id);
                                }}
                            >
                                Ver Detalle
                            </Button>
                        </div>
                    </Popup>
                )}
            </Map>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs">
                <p className="font-semibold text-[var(--text-primary)] mb-2">Leyenda</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#3B82F6' }} />
                        <span className="text-[var(--text-secondary)]">Casa</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#10B981' }} />
                        <span className="text-[var(--text-secondary)]">Departamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#8B5CF6' }} />
                        <span className="text-[var(--text-secondary)]">Oficina</span>
                    </div>
                </div>
            </div>

            {/* Property Count */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {properties.length} {properties.length === 1 ? 'propiedad' : 'propiedades'}
                </p>
            </div>
        </div>
    );
}
