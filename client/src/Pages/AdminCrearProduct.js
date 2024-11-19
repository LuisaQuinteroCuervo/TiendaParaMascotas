import "../styles/AdminCrearProduct.css";
import api from "../api/api";
import React from "react";
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
    const { nombre, descripcion, categoria, precio, imagenUrl, stock } =
      newProduct;

    if (!nombre || !descripcion || !categoria || precio === 0 || !imagenUrl || stock === 0) {
      alert("Por favor, ingrese todos los datos del producto");
      return;
    }
    try {
      const response = await api.post(
        "http://localhost:3001/addProducto",
        newProduct
      );
      setNewProduct({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: 0,
        imagenUrl: "",
        stock: 0,
      });

      alert("Producto agregado correctamente");
      navigate("/AdminProductos");

    } catch (error) {
      if (error.response) {
        console.log('Deatalles del error: ', error.response.data);
        alert(error.response.data);
      }else{
        console.log('Deatalles del error: ', error);
        alert('Problema con crear el producto');
      }
      
    }
  };

  return (
    <div className="containerCrear">
      <form style={{margin: '20px'}} className="containerForm">
        <h2 className="tituloAgregar">Crear Nuevo Producto</h2>
        <br />
       
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={newProduct.nombre}
            onChange={(e) =>
              setNewProduct({ ...newProduct, nombre: e.target.value })
            }
            className="form-control"
            required
      title="Por favor, ingrese un nombre para el producto." 
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            Descripcion
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="descripcion"
            required
      title="Por favor, ingrese un nombre para el producto." 
            value={newProduct.descripcion}
            onChange={(e) =>
              setNewProduct({ ...newProduct, descripcion: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example4">
            Category
          </label>
          <select
            name="categoria"
            value={newProduct.categoria}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoria: e.target.value })
            }
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
            value={newProduct.precio}
            onChange={(e) =>
              setNewProduct({ ...newProduct, precio: e.target.value })
            }
            className="form-control"
          />
        </div>
        
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example5">
            Image
          </label>
          <input
            type="text"
            name="imagenUrl"
            value={newProduct.imagenUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imagenUrl: e.target.value })
            }
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
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            className="form-control"
            required
      min="0" 
      title="Ingrese un valor de stock no negativo."
          />
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="button" 
            onClick={handleCrearProducto} 
            
            className="btn btn-default">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCrearProduct;

