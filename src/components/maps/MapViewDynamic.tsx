'use client';

import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';

const MapView = dynamic(() => import('./MapView'), {
    ssr: false,
    loading: () => (
        <Box
            sx={{
                width: '100%',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                bgcolor: 'grey.100',
            }}
        >
            <CircularProgress />
        </Box>
    ),
});

export default MapView;
