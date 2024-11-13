import "../styles/VistaProduct.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const VistaProduct = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagenUrl, setImagenUrl] = useState("");
  const [stock, setStock] = useState(0);
  const { id } = useParams(); 
  console.log(id);
  useEffect(() => {
    
    handleCallProducto();
  }, [id]); 

  const handleCallProducto = async () => {
    try {
      const response = await api.get(`http://localhost:3001/producto/${id}`);
      setNombre(response.data.nombre);
      setDescripcion(response.data.descripcion);
      setCategoria(response.data.categoria);
      setPrecio(response.data.precio);
      setImagenUrl(response.data.imagenUrl);
      setStock(response.data.stock);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    if (quantity < stock) setQuantity(quantity + 1); // Limitar cantidad al stock disponible
  };

  const handleChange = (e) => {
    const value = Math.max(1, Math.min(stock, Number(e.target.value))); // Limitar cantidad al stock disponible
    setQuantity(value);
  };

  return (
    <div className="VistaProduct">
      <form className="container2">
        <div className="row rowA">
          <div className="col subirF">
            <img
              src={imagenUrl}
              alt={nombre}
              className="FotoS"
              style={{ maxWidth: "100%" }}
              
            />
          </div>

          <div className="row rowA">
            <div className="col">
              <p
                className="datos2"
                type="text"
                name="nombre_producto"
                value={nombre}
              >
                {nombre}
              </p>
              <br />

              <p className="datos2" type="number" name="precio" value={precio}>
               $ {precio}
              </p>
              <br />

              <p
                className="datos2"
                type="text"
                name="descripcion"
                value={descripcion}
                readOnly
              >
                {descripcion}
              </p>
              <br />

              <p
                className="datos2"
                type="text"
                name="categoria"
                value={categoria}
                readOnly
              >
                Catgoria: {categoria}
              </p>
              <br />

              <p
                className="datos2"
                type="number"
                name="stock"
                value={stock}
                readOnly
              >
                Stock: {stock}
              </p>
            </div>
          </div>

          <div className="col-lg-2">
            <p className="cantidad">Cantidad</p>
            <div className="input-group">
              <span className="input-group-btn">
                <button
                  type="button"
                  className="quantity-left-minus btn btn-danger btn-number"
                  onClick={handleMinus}
                >
                  -
                </button>
              </span>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control input-number"
                value={quantity}
                min="1"
                max={stock}
                onChange={handleChange}
              />
              <span className="input-group-btn">
                <button
                  type="button"
                  className="quantity-right-plus btn btn-success btn-number"
                  onClick={handlePlus}
                >
                  +
                </button>
              </span>
              <div className="btnCarr">
                <button className="btnAddd">Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VistaProduct;
