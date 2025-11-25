import React from 'react';
import { Drawer, Box, Typography, IconButton, Stack, Button, Divider, Avatar } from '@mui/material';
import { IconX, IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { useCart } from '@/contexts/CartContext';

const CartDrawer = () => {
    const { isCartOpen, toggleCart, items, addToCart, decreaseQuantity, removeFromCart, totalPrice } = useCart();

    return (
        <Drawer
            anchor="right"
            open={isCartOpen}
            onClose={toggleCart}
            PaperProps={{
                sx: { width: '320px', borderLeft: '1px solid', borderColor: 'divider' },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" fontWeight={600}>
                    Shopping Cart
                </Typography>
                <IconButton onClick={toggleCart}>
                    <IconX size={20} />
                </IconButton>
            </Box>
            <Divider />

            {items.length === 0 ? (
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
                    <Typography variant="h6" color="textSecondary" align="center">
                        Your cart is empty
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
                        Start adding some futuristic gear!
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* Cart Items List */}
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        <Stack spacing={2} sx={{ p: 2 }}>
                            {items.map((item) => (
                                <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        src={item.image}
                                        alt={item.title}
                                        variant="rounded"
                                        sx={{ width: 64, height: 64 }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle2" fontWeight={600} noWrap>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => decreaseQuantity(item.id)}
                                                sx={{ border: '1px solid', borderColor: 'divider', p: 0.5 }}
                                            >
                                                <IconMinus size={14} />
                                            </IconButton>
                                            <Typography variant="body2" fontWeight={600}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => addToCart(item)}
                                                sx={{ border: '1px solid', borderColor: 'divider', p: 0.5 }}
                                            >
                                                <IconPlus size={14} />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                    <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                        <IconTrash size={18} />
                                    </IconButton>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>

                    {/* Footer / Checkout */}
                    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                Total:
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={600} color="primary">
                                ${totalPrice.toFixed(2)}
                            </Typography>
                        </Stack>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => alert('Checkout functionality coming soon!')}
                        >
                            Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Drawer>
    );
};

export default CartDrawer;
