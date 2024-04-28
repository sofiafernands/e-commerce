import React, { useState } from 'react';
import { addProduct } from '../../../services/api.jsx';
import { Form, Button, Toast } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar.jsx';
import { Link } from 'react-router-dom';
import './AddProductForm.css';

function AddProductForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [showToast, setShowToast] = useState(false); // Nuevo estado para controlar el Toast

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { title, description, price, image };
    await addProduct(product);
    setTitle('');
    setDescription('');
    setPrice('');
    setImage('');

    setShowToast(true); 
    setTimeout(() => {
      setShowToast(false); 
    }, 4000);
  };

  return (
    <>
    <NavBar />
        <h2>Añadir producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
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

     <Link to="/" className='back'> Volver al inico
     </Link>
      
    </>
  );
}

export default AddProductForm;