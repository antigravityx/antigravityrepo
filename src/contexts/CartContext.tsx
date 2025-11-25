import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = useCallback((product: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      // Parse price string to number (remove '$' and convert)
      const priceValue = typeof product.price === 'string'
        ? parseFloat(product.price.replace('$', ''))
        : product.price;

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, price: priceValue, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart when adding item
  }, []);

  const decreaseQuantity = useCallback((id: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevItems.filter((item) => item.id !== id); // Remove if quantity becomes 0
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    toggleCart
  }), [items, addToCart, removeFromCart, decreaseQuantity, clearCart, totalItems, totalPrice, isCartOpen, toggleCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
