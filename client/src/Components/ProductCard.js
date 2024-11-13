import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/VistaProduct/${product.id}`} className="ProCard" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className="card" style={{ width: "18rem" }}>
    <img className="card-img-top" src={product.imagenUrl} alt={product.nombre} />
    <div className="card-body">
      <h5 className="card-title">{product.nombre}</h5>
      <p className="card-text">${product.precio}</p>
      <p className="card-text">{product.categoria}</p>
      <button href="#" className="btn btn-outline-primary">Añadir al carrito</button>
    </div>
  </div>
</Link>

  );
};

export default ProductCard;


    /*<div className="product-card">
            
            <h1>{product.nombre}</h1>
            <p>{product.descripcion}</p>  
            <p>{product.categoria}</p>  
            <p>{product.precio}</p>     
            <img src={product.imagenUrl} alt={product.nombre} />  
            <p>${product.stock}</p> 
            <Link to={`/product/${product.id}`}>Ver detalles</Link>     
        </div>*/

