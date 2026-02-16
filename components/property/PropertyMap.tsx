'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card } from '@/components/ui/card';

interface PropertyMapProps {
    latitude: number;
    longitude: number;
    title: string;
}

export default function PropertyMap({ latitude, longitude, title }: PropertyMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        // Initialize map
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [longitude, latitude],
            zoom: 15,
        });

        // Add navigation controls
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        // Add marker for property
        new maplibregl.Marker({ color: '#e3342f' })
            .setLngLat([longitude, latitude])
            .setPopup(
                new maplibregl.Popup().setHTML(
                    `<div class="p-2">
            <p class="font-semibold">${title}</p>
          </div>`
                )
            )
            .addTo(map.current);

        // Cleanup
        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [latitude, longitude, title]);

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                Ubicación
            </h3>
            <Card className="overflow-hidden">
                <div ref={mapContainer} className="h-96 w-full" />
            </Card>
        </div>
    );
}
