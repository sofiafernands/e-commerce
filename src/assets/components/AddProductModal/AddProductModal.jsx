// src/components/AddProductModal.jsx
import React, { useState } from 'react';
import { useProducts } from '../../../hooks/UseProducts';

const AddProductModal = ({ onClose }) => {
  const { addProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(newProduct);
    onClose(); 
  };

  
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1000
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h2>Añadir Producto Nuevo</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            placeholder="Título del producto"
            required
          />
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Descripción del producto"
            required
          />
          <label htmlFor="price">Precio:</label>
          <input
            id="price"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Precio del producto"
            required
          />
          <div>
            <button type="submit">Añadir Producto</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductModal;
