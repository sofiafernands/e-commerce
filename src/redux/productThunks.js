import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api'; 
// Thunk para obtener productos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const products = await getProducts();
  return products;
});

// Thunk para agregar un producto
export const addProductAsync = createAsyncThunk('products/addProduct', async (productData) => {
  const product = await addProduct(productData);
  return product;
});

// Thunk para actualizar un producto
export const updateProductAsync = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  const product = await updateProduct(id, productData);
  return product;
});

// Thunk para eliminar un producto
export const deleteProductAsync = createAsyncThunk('products/deleteProduct', async (id) => {
  await deleteProduct(id);
  return id;
});

