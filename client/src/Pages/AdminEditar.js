import "../styles/AdminCrearProduct.css";
import api from "../api/api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagen_url, setImagen_url] = useState("");
  const [stock, setStock] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    handleCallProducto();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `http://localhost:3001/modificarProducto/${id}`,  
        {
          nombre,
          descripcion,
          categoria,
          precio,
          imagen_url,
          stock,
        }
      );
      console.log(response.data);
      alert("Producto actualizado correctamente");
      navigate("/AdminProductos"); 
    } catch (error) {
      if (error.response) {
        console.error("Detalles del error: ", error.response.data);
        alert(`eror: ${error.response.data.message || 'Problema con actualizar el producto'}`);	  
      } else {
        console.error('Error al actualizar el producto: ', error.message);
        alert("Problema con actualizar el producto");
      }
    }
  };

  const handleCallProducto = async () => {
    try {
      const response = await api.get(`http://localhost:3001/producto/${id}`);
      setNombre(response.data.nombre || "");
      setDescripcion(response.data.descripcion || "");
      setCategoria(response.data.categoria || "");
      setPrecio(response.data.precio || 0);
      setImagen_url(response.data.imagen_url || "");
      setStock(response.data.stock || 0);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  return (
    <div className="containerCrear">
      <form style={{ margin: "20px" }} className="containerForm" onSubmit={handleSubmit}>
        <h2 className="tituloAgregar">Editar El Producto</h2>
        <br />
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example1">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="descripcion"
            required
            title="Por favor, ingrese un nombre para el producto."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <br />

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example4">
            Category
          </label>
          <select
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="alimentos">Alimentos</option>
            <option value="juguetes">Juguetes</option>
            <option value="accesorios">Accesorios</option>
            <option value="medicamentos">Medicamentos</option>
          </select>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example2">
            Precio
          </label>
          <input
            type="number"
            nombre="price"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="form-control"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example5">
            Image
          </label>
          <input
            type="text"
            name="imagen_url"
            value={imagen_url}
            onChange={(e) => setImagen_url(e.target.value)}
            className="form-control"
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="form-control"
            required
            min="0" // Stock mínimo de 0
            title="Ingrese un valor de stock no negativo."
          />
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="submit"
              
              className="btn btn-default"
            >
              Actualizar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminEditar;
