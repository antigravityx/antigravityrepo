import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, Stack } from '@mui/material';
import Image from 'next/image';
import DashboardCard from '../shared/DashboardCard';
import { useCart } from '@/contexts/CartContext';

const products = [
    {
        id: 1,
        title: 'Cyber Backpack',
        price: '$199.99',
        image: '/images/products/cyber-backpack.png',
        description: 'Futuristic, high-tech storage for the modern nomad. Features smart connectivity and anti-theft protection.',
    },
    {
        id: 2,
        title: 'Neon Hoodie',
        price: '$89.99',
        image: '/images/products/cyber-backpack.png', // Placeholder, reusing image for now or use a generic one
        description: 'Comfortable hoodie with integrated LED strips for visibility and style.',
    },
    {
        id: 3,
        title: 'Smart Visor',
        price: '$149.99',
        image: '/images/products/cyber-backpack.png', // Placeholder
        description: 'Augmented reality visor with heads-up display and navigation.',
    }
];

const ProductGallery = () => {
    const { addToCart } = useCart();

    return (
        <DashboardCard title="Product Gallery">
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>


                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
                            <Box sx={{ position: 'relative', width: '100%', height: '250px' }}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </Box>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {product.description}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mt="auto">
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                        {product.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </DashboardCard>
    );
};

export default ProductGallery;
