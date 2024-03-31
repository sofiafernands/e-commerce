import React from 'react';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

function NavBar({ searchTerm, handleSearch }) {
  const { cartItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">MiTienda</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Categorías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Ofertas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
          <div className="ms-3">
            <Link to="/cart" className="nav-link">
              Carrito ({cartItems.length} ítems)
            </Link>

          </div>
          <div className="ms-3 d-flex align-items-center">
            {/* Iconos de redes sociales */}
            <a href="https://facebook.com" className="nav-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="nav-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="nav-link">
              <i className="fab fa-instagram"></i>
            </a>
            {/* Enlace a sección de contacto */}
            <a href="mailto:contacto@mitienda.com" className="nav-link">
              contacto@mitienda.com
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
