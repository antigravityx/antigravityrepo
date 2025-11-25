'use client';

import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Stack,
    Alert,
    CircularProgress,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { getCurrentPosition, GeolocationPosition } from '@/lib/geolocation';
import MapView from './MapViewDynamic';

interface AddressInputProps {
    value: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode?: string;
        coordinates?: GeolocationPosition;
    };
    onChange: (value: any) => void;
}

export default function AddressInput({ value, onChange }: AddressInputProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetLocation = async () => {
        try {
            setLoading(true);
            setError(null);

            const position = await getCurrentPosition();

            onChange({
                ...value,
                coordinates: position,
            });
        } catch (err: any) {
            setError(err.message || 'No se pudo obtener la ubicación');
        } finally {
            setLoading(false);
        }
    };

    const handleFieldChange = (field: string, fieldValue: string) => {
        onChange({
            ...value,
            [field]: fieldValue,
        });
    };

    return (
        <Stack spacing={2}>
            {/* GPS Button */}
            <Button
                variant="outlined"
                startIcon={loading ? <CircularProgress size={20} /> : <MyLocationIcon />}
                onClick={handleGetLocation}
                disabled={loading}
                fullWidth
            >
                {loading ? 'Obteniendo ubicación...' : 'Usar mi ubicación GPS'}
            </Button>

            {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Address Fields */}
            <TextField
                label="Calle y número"
                value={value.street || ''}
                onChange={(e) => handleFieldChange('street', e.target.value)}
                required
                fullWidth
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                    label="Ciudad"
                    value={value.city || ''}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Provincia/Estado"
                    value={value.state || ''}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    required
                    fullWidth
                />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                    label="País"
                    value={value.country || ''}
                    onChange={(e) => handleFieldChange('country', e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Código Postal (opcional)"
                    value={value.postalCode || ''}
                    onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                    fullWidth
                />
            </Stack>

            {/* Map */}
            {value.coordinates && (
                <Box sx={{ mt: 2 }}>
                    <MapView
                        center={[value.coordinates.lat, value.coordinates.lng]}
                        zoom={15}
                        height="300px"
                    />
                </Box>
            )}
        </Stack>
    );
}
