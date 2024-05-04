import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    // Agrega otras acciones según sea necesario, como agregar, eliminar o actualizar productos
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
