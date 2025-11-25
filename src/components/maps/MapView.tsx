'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
    center: [number, number];
    zoom?: number;
    height?: string | number;
    onLocationChange?: (lat: number, lng: number) => void;
}

export default function MapView({
    center,
    zoom = 13,
    height = '400px',
    onLocationChange
}: MapViewProps) {
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        // Initialize map
        const map = L.map(containerRef.current).setView(center, zoom);

        // Add OpenStreetMap tiles (FREE!)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add marker
        const marker = L.marker(center, {
            draggable: !!onLocationChange,
        }).addTo(map);

        // Handle marker drag
        if (onLocationChange) {
            marker.on('dragend', () => {
                const position = marker.getLatLng();
                onLocationChange(position.lat, position.lng);
            });
        }

        mapRef.current = map;
        markerRef.current = marker;

        // Cleanup
        return () => {
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
    }, []);

    // Update marker position when center changes
    useEffect(() => {
        if (mapRef.current && markerRef.current) {
            mapRef.current.setView(center, zoom);
            markerRef.current.setLatLng(center);
        }
    }, [center, zoom]);

    return (
        <Box
            ref={containerRef}
            sx={{
                width: '100%',
                height,
                borderRadius: 2,
                overflow: 'hidden',
                '& .leaflet-container': {
                    height: '100%',
                    width: '100%',
                },
            }}
        />
    );
}
