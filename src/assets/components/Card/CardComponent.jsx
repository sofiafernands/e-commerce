import React from 'react';
import './CardComponent.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useCart } from '../../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import useProducts from '../AddProductModal/AddProductModal.jsx';


function CardComponent({ id, title, description, price, image }) {
    const { user} = useAuth();
    const { deleProduct } = useProducts();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = { title, description, price, image };

    const goToDetail = () => {
        navigate(`/product/${id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteProduct(id);
      };

    return (
        <div className="card" style={{ width: "12rem" }} onClick={goToDetail}>
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text flex-grow-1 card-content">{description}</p>
                <h6 className='price'>${price}</h6>
            </div>
            {/* con el stopPropagation evitamos que el evento click funcione para ambas cosas correctamente */}
            <button onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
            }} className="btn btn-primary">
                Añadir a la cesta
            </button>
            {
                user && user.isAdmin && (
                    <>
                        <button onClick={() => editProduct(id)}>Editar</button>
                        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
                    </>
                )
            }

        </div>

    );
}

export default CardComponent;