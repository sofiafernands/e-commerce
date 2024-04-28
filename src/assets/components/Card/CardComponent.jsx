import React, { useState } from 'react';
import './CardComponent.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useCart } from '../../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct } from '../../../services/api.js';
import { Modal, Button, Form } from 'react-bootstrap';

function CardComponent({ id, title, description, price, image }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [editPrice, setEditPrice] = useState(price);  // Estado para el precio en el modal de edición
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleDeleteShow = () => setShowDeleteModal(true);

    const handleEditClose = () => setShowEditModal(false);
    const handleEditShow = () => setShowEditModal(true);

    const goToDetail = () => {
        navigate(`/product/${id}`);
    };

    const isAdmin = localStorage.getItem("role") === "admin";

    return (
        <div className="card" style={{ width: "12rem" }} onClick={goToDetail}>
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text flex-grow-1 card-content">{description}</p>
                <h6 className='price'>${price}</h6>
                <button onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ title, description, price, image });
                }} className="btn btn-primary">
                    Añadir a la cesta
                </button>
                {isAdmin && (
                    <div>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleEditShow();
                        }} className="btn btn-primary">
                            Editar
                        </button>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteShow();
                        }} className="btn btn-primary">
                            Eliminar
                        </button>
                    </div>
                )}
            </div>

            <Modal show={showDeleteModal} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Seguro que deseas eliminar este producto?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={async () => {
                        await deleteProduct(id);
                        handleDeleteClose();
                    }}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={async () => {
                        const updatedProduct = { ...product, price: editPrice };
                        await updateProduct(id, updatedProduct);
                        handleEditClose();
                    }}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CardComponent;
