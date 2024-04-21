import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/products'; // Asegúrate de usar la URL correcta de tu API


export const UseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener productos
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Agregar producto
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(API_URL, newProduct);
      setProducts([...products, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  // Actualizar producto
  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
    } catch (err) {
      setError(err);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};


