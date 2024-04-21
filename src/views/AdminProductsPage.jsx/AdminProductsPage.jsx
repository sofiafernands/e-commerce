import React, { useState } from 'react';
import AddProductModal from '../../assets/components/AddProductModal/AddProductModal';
import { useProducts } from '../../hooks/UseProducts';

const AdminProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addProduct } = useProducts();

  const handleAddProduct = async (product) => {
    await addProduct(product); // Llama a la función del hook para añadir un producto
    setIsModalOpen(false); // Cierra el modal tras añadir el producto
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Añadir Producto</button>
      {isModalOpen && (
        <AddProductModal onClose={() => setIsModalOpen(false)} onAddProduct={handleAddProduct} />
      )}
      {/* Aquí puedes listar los productos y añadir funcionalidad para editar y eliminar */}
    </>
  );
};

export default AdminProductsPage;
