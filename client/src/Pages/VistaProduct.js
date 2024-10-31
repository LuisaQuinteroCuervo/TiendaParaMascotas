import "../styles/VistaProduct.css";
import React, { useState } from "react";

const VistaProduct = () => {
  const [quantity, setQuantity] = useState(10);

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    if (quantity < 100) setQuantity(quantity + 1);
  };

  const handleChange = (e) => {
    const value = Math.max(1, Math.min(100, Number(e.target.value)));
    setQuantity(value);
  };

  return (
    <div className="VistaProduct">
      <form className="container2">
        <div className="row rowA">
          <div className="col subirF">
            <input
              type="file"
              className="FotoS"
              accept="image/*"
              ///onChange={handleImageS}
            ></input>
          </div>

          <div className="row rowA">
            <div className="col">
              <input
                className="datos2"
                type="text"
                name="nombre_producto"
                //value={}
                //onChange={}
                readOnly
              ></input>
              <br></br>

              <p>Precio:</p>
              <input
                className="datos2"
                type="number"
                name="precio"
                //value={}
                //onChange={}
                readOnly
              ></input>
              <br></br>

              <p>descripcion:</p>
              <input
                className="datos2"
                type="email"
                name="email"
                //value={}
                //onChange={}
                readOnly
              ></input>
              <br></br>
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
                  <span className="glyphicon glyphicon-minus" style={{ color: '#004AAD', fontSize: '20px' }} >-</span>
                </button>
              </span>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control input-number  " style={{ backgroundColor: '#D9D9D9', borderColor: '#FFFFFF' }}
                value={quantity}
                min="1"
                max="100"
                onChange={handleChange}
              />
              <span className="input-group-btn" >
                <button
                  type="button"
                  className="quantity-right-plus btn btn-success btn-number"
                  onClick={handlePlus}
                >
                  <span className="glyphicon glyphicon-plus" style={{ color: '#004AAD', fontSize: '20px' }}>+</span>
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
