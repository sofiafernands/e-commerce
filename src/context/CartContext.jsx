import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // Asegúrate de ajustar la ruta

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Reiniciar el carrito cuando el usuario cierre sesión
    if (!user) {
      setCartItems([]);
    } else {
      // restaurar el carrito del usuario al iniciar sesión
      const savedCart = localStorage.getItem(`cart-${user.email}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [user]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, product];
      if (user) {
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem(`cart-${user.email}`, JSON.stringify(newItems));
      }
      return newItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
