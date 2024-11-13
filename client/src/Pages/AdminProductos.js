import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import api from "../api/api";

const AdminProductos = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  const hadleEliminar = async (id) => {
    try {
      await api.delete(`http://localhost:3001/eliminarProducto/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Producto eliminado");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("http://localhost:3001/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 text-start">
          <h1 className="titH" >Todos Los Productos</h1>
        </div>
        <div className=" text-end">
          <button
            className="btnV"
            type="button"
            onClick={() => handleNavigate("/AdminCrearProduct")}
          >
            Agregar Producto
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">categoria</th>
                <th scope="col">precio</th>
                <th scope="col">imagenUrl</th>
                <th scope="col">stock</th>
                <th scope="col">Editar</th>
                <th scope="col">Borrar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.nombre}</td>
                  <td>{product.descripcion}</td>
                  <td>{product.categoria}</td>
                  <td>${product.precio}</td>
                  <td>
                    {" "}
                    <img
                      src={product.imagenUrl}
                      alt={product.nombre}
                      className="w-10 h-10 object-cover "
                    />
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    <a
                      href={`/AdminEditar/${product.id}`}
                      type="button"
                      className="btn"
                      style={{ color: "#002D6A" }}
                    >
                      Editar
                    </a>
                  </td>
                  <td>
                    <a
                      onClick={() => hadleEliminar(product.id)}
                      type="button"
                      className="btn"
                      style={{ color: "#002D6A" }}
                    >
                      Eliminar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminProductos;

