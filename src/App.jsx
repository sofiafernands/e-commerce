import React, { useState } from 'react';
import './App.css';
import './DarkMode.css';
import 'bootstrap/dist/css/bootstrap.css';
import data from '../data.json';
import CardComponent from './assets/components/Card/CardComponent.jsx';
import NavBar from './assets/components/NavBar/NavBar.jsx';
import LoginForm from './assets/components/FormLogin.jsx/Login.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; // Asegúrate de importar useAuth
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme(); // Usar el tema actual
  const { user } = useAuth(); // Obtener el usuario actual

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = data.filter(product =>
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
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                  />
                </div>
              ))}
            </div>
            <LoginForm />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
