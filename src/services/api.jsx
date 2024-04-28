import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const addProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  console.log('Updating product:', id, product);
  try {
    const response = await api.put(`/products/${id}`, product);
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};