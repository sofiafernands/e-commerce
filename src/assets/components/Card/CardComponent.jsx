import React, { useState } from 'react';
import './CardComponent.css';
import data from '../../../../data.json';
import 'bootstrap/dist/css/bootstrap.css';
import { useCart } from '../../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct, getProducts } from '../../../services/api.jsx';
import { Modal, Button, Form } from 'react-bootstrap';

function CardComponent({ id:id, title, description, price, image }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [editTitle, setEditTitle] = useState(title);  // Estado para el título en el modal de edición
    const [editPrice, setEditPrice] = useState(price);  // Estado para el precio en el modal de edición
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleDeleteShow = () => setShowDeleteModal(true);

    const handleEditClose = () => setShowEditModal(false);
    const handleEditShow = () => setShowEditModal(true);

    const goToDetail = (e) => {
        e.stopPropagation();
        navigate(`/product/${id}`);
    };

    const handleTitleClick = (e) => {
        e.stopPropagation();
        handleEditShow();
      };

      const handlePriceClick = (e) => {
        e.stopPropagation();
        handleEditShow();
      };
    const isAdmin = localStorage.getItem("role") === "admin";

    return (
        <div>

        <div className="card" style={{ width: "12rem" }} onClick={goToDetail}>
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body d-flex flex-column">
            <h5 className="card-title" onClick={handleTitleClick}>{title}</h5>
                <p className="card-text flex-grow-1 card-content">{description}</p>
                <h6 className='price' onClick={handlePriceClick}>${price}</h6>
                </div>

                <div> 
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
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </Form.Group>
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
                    <Button variant="secondary" onClick={(e) => {
                        e.stopPropagation();
                        handleEditClose();
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={async (e) => {
                        e.stopPropagation();
                        const fetchProducts = async () => {
                            try {
                              const products = await getProducts();
                              console.log(products);
                              console.log(id)
                              const singleProduct = products.find(product => String(product.id) === String(id));
                                console.log(singleProduct);
                              console.log(singleProduct);
                              if (singleProduct) {
                                singleProduct.title = editTitle;
                                singleProduct.price = editPrice;
                                await updateProduct(id, singleProduct);
                              } else {
                                console.error('Product not found');
                              }
                            } catch (error) {
                              console.error('Error fetching products:', error);
                            }
                          }
                          fetchProducts();

        
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
