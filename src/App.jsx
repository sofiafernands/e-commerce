import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Agrega esta línea
import { fetchProducts } from '../src/redux/thunks/productThunks'; // Agrega esta línea
import './App.css';
import './DarkMode.css';
import 'bootstrap/dist/css/bootstrap.css';
import data from '../data.json';
import CardComponent from './assets/components/Card/CardComponent.jsx';
import NavBar from './assets/components/NavBar/NavBar.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; 
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import { getProducts } from './services/api.jsx';

function App() {
  const searchTerm = useSelector(state => state.searchTerm);
  const dispatch = useDispatch(); // Agrega esta línea
  const { theme } = useTheme(); // Usar el tema actual
  const { user } = useAuth(); // Obtener el usuario actual
  const [products, setProducts] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          {/* Mensaje de bienvenida condicional */}
          {user && (
            <div className="welcome-message">
              Bienvenido, {user.name}! Disfruta de un 20% de descuento en tu próxima compra.
            </div>
          )}
          <div className={`container ${theme}`}> {/*arreglar*/}
            <NavBar searchTerm={searchTerm} handleSearch={handleSearch} />
            <div className="row gx-5">
              {filteredProducts.map((product) => (
                <div className="col-md-2" key={product.id}>
                  <CardComponent
                  className="single-product"
                  id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
