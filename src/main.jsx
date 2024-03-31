import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CartDetails from '../src/assets/components/CartDetail/CartDetail.jsx'; 
import { CartProvider } from '../src/context/CartContext.jsx'; // Asegúrate de importar CartProvider desde la ubicación correcta
import NavBar from './assets/components/NavBar/NavBar.jsx';
import Footer from './assets/components/Footer/Footer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<CartDetails />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  </React.StrictMode>
);