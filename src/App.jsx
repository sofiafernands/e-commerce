// App.jsx
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import data from '../data.json';
import CardComponent from './assets/components/Card/CardComponent.jsx';
import NavBar from './assets/components/NavBar/NavBar.jsx';
import Footer from './assets/components/Footer/Footer.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <NavBar searchTerm={searchTerm} handleSearch={handleSearch} className="flex-wrap " />
      <div className="row gx-5">
        {filteredProducts.map((product) => (
          <div className="col-md-2 " key={product.id}>
            <CardComponent
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>
      < Footer />
    </div>
  );
}

export default App;