import React from 'react';
import { useCart } from '../../../context/CartContext.jsx'; 
import NavBar from '../NavBar/NavBar.jsx';
import './CartDetail.css'; // Importa el archivo CSS

function CartDetails() {
  const { cartItems } = useCart();

  return (
    <div className="cart-details">
      <NavBar />
      <h2>Detalles del Carrito</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - Cantidad: 1 - Precio: ${item.price}
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