import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';

function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { user, login, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email });
  };

  if (user) {
    return (
      <div>
        <p>Bienvenido, {user.name}!</p>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default LoginForm;
