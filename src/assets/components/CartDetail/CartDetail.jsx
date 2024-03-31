import React from 'react';
import { useCart } from '../../../context/CartContext.jsx'; 
import NavBar from '../NavBar/NavBar.jsx';

function CartDetails() {
  console.log(useCart());
  const { cartItems } = useCart();

  return (
    <div>
      <NavBar />
      <h2>Detalles del Carrito</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - Cantidad: 1 - Precio: ${item.price}
              {/* Asumiendo que cada producto añadido al carrito es una única unidad */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
}

export default CartDetails;
