// ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../data.json'; 
import NavBar from '../assets/components/NavBar/NavBar';

function ProductDetail() {
  const { id } = useParams();
  console.log("ID del producto:", id); // Imprime el id del producto en la consola

  const producto = data.find((product) => product.id === Number(id));

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <div>
      <NavBar />
      <h2>{producto.title}</h2>
      <img src={producto.image} alt={producto.title} style={{width:"300px"}} />
      <h3>{producto.category}</h3>
      <p>{producto.description}</p>
      <p>${producto.price}</p>
    </div>
    
  );
}

export default ProductDetail;