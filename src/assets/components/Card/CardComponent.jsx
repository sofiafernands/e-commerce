import React, { useState } from 'react';
import './CardComponent.css';
import data from '../../../../data.json';
import 'bootstrap/dist/css/bootstrap.css';
import { useCart } from '../../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct, getProducts } from '../../../services/api.jsx';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

function CardComponent({ id: id, title, description, price, image }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');


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
    const isLoggedIn = Boolean(localStorage.getItem("user"));

    const onSubmit = async (data) => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                const singleProduct = products.find(product => String(product.id) === String(id));
                if (singleProduct) {
                    singleProduct.title = data.editTitle;
                    singleProduct.price = data.editPrice;
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
    };

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
                        if (isLoggedIn) {
                            addToCart({ title, description, price, image });
                        } else {
                            navigate('/login');
                        }
                    }} className="btn btn-primary">
                        Añadir a la cesta
                    </button>
                    {isAdmin && isLoggedIn && (
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
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Controller
                                name="editTitle"
                                control={control}
                                defaultValue={title}
                                rules={{ required: 'El título es requerido' }}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            if (e.target.value === '') {
                                                setErrorMessage('El título es requerido');
                                            } else {
                                                setErrorMessage('');
                                            }
                                        }}
                                    />
                                )}
                            />
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Controller
                                name="editPrice"
                                control={control}
                                defaultValue={price}
                                rules={{ required: 'El precio es requerido' }}
                                render={({ field }) => 
                                <Form.Control type="number" {...field} />}
                            />
                            {errors.editPrice && <p style={{ color: 'red' }}>{errors.editPrice.message}</p>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CardComponent;