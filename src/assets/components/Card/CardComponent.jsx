import React from 'react';
import './CardComponent.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useCart } from '../../../context/CartContext.jsx';

function CardComponent({ title, description, price, image }) {
    const { addToCart } = useCart();
  
    const product = { title, description, price, image };
    return (
        <div className="card" style={{width:"12rem"}}>
            <img src={image} className="card-img-top" alt={title}/>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text flex-grow-1 card-content">{description}</p>
                <h6 className='price'>${price}</h6>
            </div>
            <button onClick={() => addToCart(product)} className="btn btn-primary">
      Añadir a la cesta
    </button>
        </div>

    );
}

export default CardComponent;