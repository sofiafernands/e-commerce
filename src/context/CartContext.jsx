import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  //Se Inicializa el estado del carrito con los artículos almacenados en localStorage, si existen.
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, product];
      // Actualiza localStorage cada vez que se añade un nuevo producto al carrito.
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  //  Escucha los cambios en cartItems y actualiza localStorage.
  // Este paso es útil si modificas cartItems en otro lugar fuera de addToCart.
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
