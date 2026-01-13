import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const STORAGE_PREFIX = 'shangrila_cart';

export function useCart() {
    const { props } = usePage();
    const user = props.auth?.user;

    // Determine the storage key based on the user
    // If logged in: akhu_cart_user_{id}
    // If guest: akhu_cart_guest
    const cartKey = user ? `${STORAGE_PREFIX}_user_${user.id}` : `${STORAGE_PREFIX}_guest`;

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from local storage when key changes
    useEffect(() => {
        // Reset initialization state when switching keys to prevent saving empty state to wrong key
        setIsInitialized(false);

        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart JSON', e);
                setCart([]);
            }
        } else {
            setCart([]);
        }
        setIsInitialized(true);
    }, [cartKey]);

    // Save to local storage whenever cart changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(cartKey, JSON.stringify(cart));
        }
    }, [cart, isInitialized, cartKey]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        // Note: Auto-open disabled per user preference
        // setIsCartOpen(true); 
    };

    const addItemsToCart = (products) => {
        setCart(prevCart => {
            let newCart = [...prevCart];
            products.forEach(product => {
                const existingItemIndex = newCart.findIndex(item => item.id === product.id);
                if (existingItemIndex > -1) {
                    newCart[existingItemIndex] = {
                        ...newCart[existingItemIndex],
                        quantity: newCart[existingItemIndex].quantity + (product.quantity || 1)
                    };
                } else {
                    newCart.push({ ...product, quantity: product.quantity || 1 });
                }
            });
            return newCart;
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
        cart,
        isCartOpen,
        setIsCartOpen,
        setIsCartOpen,
        addToCart,
        addItemsToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount
    };
}
