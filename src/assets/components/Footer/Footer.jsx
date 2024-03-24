import React from 'react';
import './Footer.css';

export const Footer = () => {
  

    return (
      <footer className="footer ">
        <div className="container ">
            <div className="row">
                <div className="col-md-4">
                    <h5>Contactos</h5>
                    <ul>
                        <li>Email: info@hotmail.com</li>
                        <li>Telefono: +34 123 456 789</li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>Redes Sociales</h5>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                    </ul>
                 </div>   
                 <div className="col-md-4">
                    <h5>Direccion</h5>
                    <ul>
                        <li>Calle: Calle Falsa 123</li>
                        <li>Ciudad: Springfield</li>
                        <li>Pais: USA</li>
                    </ul>
                 </div>   
            </div>
        </div>
        </footer>
        )
  };

  export default Footer