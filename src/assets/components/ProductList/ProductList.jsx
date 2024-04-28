import React, { useState, useEffect } from 'react';
import { getProducts } from './services/api';
import CardComponent from './CardComponent';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <CardComponent
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default ProductList;