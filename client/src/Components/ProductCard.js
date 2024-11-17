import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Imagen por defecto por si no hay imagen
  const defaultImage = "https://via.placeholder.com/300x200?text=Imagen+no+disponible";

  return (
    <Link
      to={`/VistaProduct/${product.id}`}
      className="ProCard"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card" style={{ width: "18rem" }}>
        {/* Validación de la imagen */}
        <img
          className="card-img-top"
          src={product.imagen_url || defaultImage}
          alt={product.nombre || "Producto"}
          style={{ objectFit: "contain", height: "200px", width: "100%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.nombre}</h5>
          <p className="card-text">${product.precio}</p>
          <button className="btn btn-outline-primary">Añadir al carrito</button>
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

