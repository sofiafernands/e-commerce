import React from 'react';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaUser, FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { MdAddComment } from "react-icons/md";
import { useAuth } from '../../../context/AuthContext';
import './Navbar.css';



function NavBar({ searchTerm, handleSearch }) {
  const { cartItems } = useCart();
  const { toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.log('Fallo al cerrar sesión');
    }
  };


  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">TodoClick</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
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
              <FaShoppingCart />
              ({cartItems.length} ítems)
            </Link>

          </div>
          <div className="ms-3 d-flex align-items-center">
            {/* Iconos de redes sociales */}
            <a href="https://facebook.com" className="nav-link">
              <FaFacebookSquare style={{ height: "30px" }} />

            </a>

            <a href="https://instagram.com" className="nav-link">
              <GrInstagram style={{ margin: "10px" }} />
            </a>

            <a href="mailto:contacto@mitienda.com" className="nav-link">
              <MdOutlineContactPhone style={{ height: "60px" }} />
            </a>
          </div>
        </div>
      </div>
      {currentUser ? (
        <button onClick={handleLogout} className="nav-link">Cerrar Sesión</button>
      ) : (
        <Link to="/login" className="nav-link"><FaUser />
        </Link>
      )}
      <Link to="/addproduct" className="nav-link m-3"> <MdAddComment /> </Link>
    </nav>
  );
}

export default NavBar;
