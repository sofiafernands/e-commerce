import React, { useState } from 'react';
import { addProduct } from '../../../services/api';
import { Form, Button, Toast } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import './AddProductForm.css';
import { useForm, Controller } from 'react-hook-form';

function AddProductForm() {
  const [showToast, setShowToast] = useState(false);
  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    await addProduct(data);
    reset();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <>
      <NavBar />
      <h2>Añadir producto</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
              required: 'El título es requerido',
              minLength: { value: 3, message: 'El título debe tener al menos 3 caracteres' }
            }}
            render={({ field }) => <Form.Control type="text" {...field} />}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: 'La descripción es requerida',
              minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' }
            }}
            render={({ field }) => <Form.Control type="text" {...field} />}
          />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{
              required: 'El precio es requerido',
              min: { value: 0.01, message: 'El precio debe ser mayor a cero' }
            }}
            render={({ field }) => <Form.Control type="number" {...field} />}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Controller
            name="image"
            control={control}
            defaultValue=""
            rules={{
              required: 'La URL de la imagen es requerida',
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/,
                message: 'La URL debe ser una imagen válida (jpg, png, jpeg)'
              }
            }}
            render={({ field }) => <Form.Control type="text" {...field} />}
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Añadir producto
        </Button>
      </Form>

      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Mensaje</strong>
        </Toast.Header>
        <Toast.Body>Todo ha salido bien, tu nuevo producto se ha agregado a tu tienda virtual</Toast.Body>
      </Toast>

      <Link to="/" className="back">Volver al inicio</Link>
    </>
  );
}

export default AddProductForm;
