import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CartDetails from '../src/assets/components/CartDetail/CartDetail.jsx'; 
import { CartProvider } from '../src/context/CartContext.jsx'; 
//import NavBar from './assets/components/NavBar/NavBar.jsx';
import Footer from './assets/components/Footer/Footer.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cart" element={<CartDetails />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);