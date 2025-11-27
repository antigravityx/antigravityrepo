import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, Stack } from '@mui/material';
import Image from 'next/image';
import DashboardCard from '../shared/DashboardCard';
import { useCart } from '@/contexts/CartContext';
import { IconShoppingCartPlus } from '@tabler/icons-react';

const products = [
    {
        id: 1,
        title: 'Cyber Backpack',
        price: '$199.99',
        image: '/images/products/cyber-backpack.png',
        description: 'High-tech storage with smart connectivity',
    },
    {
        id: 2,
        title: 'Neon Hoodie',
        price: '$89.99',
        image: '/images/products/cyber-backpack.png',
        description: 'LED-integrated comfort wear',
    },
    {
        id: 3,
        title: 'Smart Visor',
        price: '$149.99',
        image: '/images/products/cyber-backpack.png',
        description: 'AR visor with heads-up display',
    }
];

const ProductGallery = () => {
    const { addToCart } = useCart();

    return (
        <DashboardCard title="Products">
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                }
                            }}
                        >
                            <Box sx={{
                                position: 'relative',
                                width: '100%',
                                height: '220px',
                                overflow: 'hidden',
                            }}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </Box>
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="700"
                                    sx={{ mb: 1, color: '#fff' }}
                                >
                                    {product.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 2,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {product.description}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt="auto"
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight="700"
                                        sx={{
                                            color: '#00d4ff',
                                            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                                        }}
                                    >
                                        {product.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        startIcon={<IconShoppingCartPlus size={18} />}
                                        onClick={() => addToCart(product)}
                                        sx={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            fontWeight: 600,
                                            px: 2,
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                                transform: 'scale(1.05)',
                                            }
                                        }}
                                    >
                                        Add
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

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Minimalist Product Gallery
    Verix × Richon
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
