import "../styles/AdminCrearProduct.css";
import api from "../api/api";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminCrearProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = React.useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: 0,
    imagenUrl: "",
    stock: 0,
  });

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, categoria, precio, imagenUrl, stock } = newProduct;

    // Validación básica de los campos
    if (!nombre || !descripcion || !categoria || precio <= 0 || !imagenUrl || stock <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos correctamente.",
      });
      return;
    }

    try {
      const response = await api.post("http://localhost:3001/addProducto", newProduct);
      console.log("Respuesta del servidor:", response.data);

      setNewProduct({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: 0,
        imagenUrl: "",
        stock: 0,
      });

      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto fue agregado correctamente.",
      }).then(() => {
        navigate("/AdminProductos");
      });
    } catch (error) {
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data || "Ocurrió un error al agregar el producto.",
        });
      } else {
        console.error("Error desconocido:", error);
        Swal.fire({
          icon: "error",
          title: "Error desconocido",
          text: "No se pudo agregar el producto. Inténtelo más tarde.",
        });
      }
    }
  };

  return (
    <div className="containerCrear">
      <form onSubmit={handleCrearProducto} className="containerForm" style={{ margin: "20px" }}>
        <h2 className="tituloAgregar">Crear Nuevo Producto</h2>
        <br />

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={newProduct.nombre}
            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
            className="form-control"
            required
            title="Por favor, ingrese un nombre para el producto."
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            className="form-control"
            rows="3"
            name="descripcion"
            value={newProduct.descripcion}
            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            required
            title="Por favor, ingrese una descripción para el producto."
          ></textarea>
        </div>
        <br />

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={newProduct.categoria}
            onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
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

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: parseFloat(e.target.value) })}
            className="form-control"
            min="0"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="imagenUrl">URL de la imagen</label>
          <input
            type="text"
            id="imagenUrl"
            name="imagenUrl"
            value={newProduct.imagenUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imagenUrl: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
            className="form-control"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-default">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default AdminCrearProduct;
