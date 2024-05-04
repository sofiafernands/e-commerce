import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './FormLogin.css';

function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { user, login, logout } = useAuth();

  const onSubmit = (data) => {
    login(data);
    if (data.email.includes('@admin.com')) {
      window.localStorage.setItem('role', 'admin');
    }
    window.location.href = '/';
  };

  if (user) {
    return (
      <div className="form">
        <p>Bienvenido, {user.name}. ¡Disfruta de nuestra variedad de productos!</p>
        <button onClick={logout}>Cerrar Sesión</button>
        <button onClick={() => window.location.href = '/'}>Volver a inicio</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="form-input"
        type="text"
        placeholder="Nombre"
        {...register("name", { required: "Nombre es requerido", minLength: { value: 2, message: "Nombre debe tener al menos 2 caracteres" } })}
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <input
        className="form-input"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email es requerido",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Formato de email inválido"
          }
        })}
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        className="form-input"
        type="password"
        placeholder="Contraseña"
        {...register("password", { required: "Contraseña es requerida", minLength: { value: 6, message: "Contraseña debe tener al menos 6 caracteres" } })}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <input
        className="form-input"
        type="password"
        placeholder="Repetir Contraseña"
        {...register("confirmPassword", {
          required: "Repetir contraseña es requerido",
          validate: value => value === watch("password") || "Las contraseñas no coinciden"
        })}
      />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

      <button className="form-button" type="submit">Iniciar Sesión</button>
      <Link className="form-link" to="/">Volver a inicio</Link>
    </form>
  );
}

export default LoginForm;
