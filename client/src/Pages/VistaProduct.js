import "../styles/VistaProduct.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const VistaProduct = () => {
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
    <div className="VistaProduct container">
      <div className="card" style={{ borderColor: "#004AAD" }}>
        <div className="container-fluid">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="preview-pic tab-content">
                <div className="tab-pane active" id="pic-1">
                  <img src={imagenUrl} alt={nombre} style={{ width: "60%", height: "60%" }} />
                </div>
                {/* Additional images can be added here if available */}
              </div>
              <ul className="preview-thumbnail nav nav-tabs">
                {/* Additional thumbnails can be added here if available */}
              </ul>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title">{nombre}</h3>

              <p className="product-description">{descripcion}</p>
              <h4 className="price">
                Current price: <span>${precio}</span>
              </h4>
              <div className="actions">
                <h5 className="category">Category: {categoria}</h5>
                <h5 className="stock">Stock: {stock}</h5>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  className="  quantity-selector  "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-icon btn-secondary"
                    style={{ backgroundColor: "#004AAD", color: "white" }}
                    aria-describedby="inputQuantitySelector"
                    data-bs-step="down"
                    onClick={handleMinus}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="inputQuantitySelector"
                    className="form-control"
                    aria-live="polite"
                    data-bs-step="counter"
                    name="quantity"
                    title="quantity"
                    value={quantity}
                    min={1}
                    max={stock}
                    step={1}
                    data-bs-round={0}
                    aria-label="Quantity selector"
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="btn btn-icon btn-secondary"
                    style={{ backgroundColor: "#004AAD", color: "white" }}
                    aria-describedby="inputQuantitySelector"
                    data-bs-step="up"
                    onClick={handlePlus}
                    disabled={quantity === stock}
                  >
                    +
                  </button>
                </div>
              </div>
              <br />
              <div
                className="actions d-flex justify-content-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#004AAD", margin: "auto" }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VistaProduct;
