import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('essentials_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('essentials_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product) => {
    setCartItems((prevItems) => {
      // Check if item already exists with same options
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.id === product.id && 
          item.selectedColor === product.selectedColor && 
          item.selectedSize === product.selectedSize
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += (product.quantity || 1);
        return newItems;
      } else {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeItem = (id, color, size) => {
    setCartItems((prevItems) => 
      prevItems.filter(item => !(item.id === id && item.selectedColor === color && item.selectedSize === size))
    );
  };

  const updateQuantity = (id, color, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map(item =>
        (item.id === id && item.selectedColor === color && item.selectedSize === size)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const subtotal = cartItems.reduce((acc, item) => {
    const priceValue = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('$', '')) 
      : item.price;
    return acc + (priceValue * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      totalItems,
      subtotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};
