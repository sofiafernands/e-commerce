import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import './FormLogin.css';

function LoginForm() {
  const [name, setName] = useState('Sofía');
  const [email, setEmail] = useState('sofia1802@admin.com');
  const { user, login, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email });
    if (email.includes('@admin')) {
      window.localStorage.setItem('role', 'admin');
    }
    window.location.href = '/';
  };

  if (user) {
    return (
      <div className="form">
        <p>Bienvenido, {user.name}!</p>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="form-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="form-button" type="submit">Iniciar Sesión</button>
      <Link className="form-link" to="/">Volver a inicio</Link>
    </form>
  );
}

export default LoginForm;