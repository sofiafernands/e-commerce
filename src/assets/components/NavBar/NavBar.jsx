import React from 'react';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { FaShoppingCart, FaUser, FaFacebookSquare } from "react-icons/fa";
import { MdOutlineContactPhone, MdAddComment } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import { useAuth } from '../../../context/AuthContext';
import './Navbar.css';



function NavBar({ searchTerm, handleSearch }) {
  const { cartItems } = useCart();
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.log('Fallo al cerrar sesión');
    }
  };

  const isAdmin = user && user.email.includes("admin.com");

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
              <a className="nav-link"
                href="https://wa.me/1234567890"
                title='Whatsapp'
                target="_blank" >Contacto <IoLogoWhatsapp /></a>
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
          {user ? (
            <div className="ms-3">
              <Link to="/cart" className="nav-link">
                <FaShoppingCart />
                ({cartItems.length} Articulos)
              </Link>
            </div>) : (
            <p></p>
          )}

          <div className="ms-3 d-flex align-items-center">
            <a href="https://facebook.com" className="nav-link" title='Facebook'  target="_blank">
              <FaFacebookSquare style={{ height: "30px" }} />
            </a>
            <a href="https://instagram.com" className="nav-link" title='Instagram'  target="_blank">
              <GrInstagram style={{ margin: "10px" }} />
            </a>
            <a href="mailto:contacto@mitienda.com" className="nav-link" title='Correo electronico'  target="_blank">
              <MdOutlineContactPhone style={{ height: "60px" }} />
            </a>
          </div>
        </div>
      </div>
      <Link to="/login" className="nav-link" title={user ? "cerrar sesion" : "iniciar sesion"}>
        <FaUser />
      </Link>
      {user ? (
        <>
          {isAdmin && (
            <Link to="/addproduct" className="nav-link m-3">
              <MdAddComment />
            </Link>
          )}
        </>
      ) : (
        <p></p>
      )}

    </nav>
  );
}

export default NavBar;
