import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import api from "../api/api";
import "../styles/AdminProductos.css";

const AdminProductos = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  const handleEliminar = async (id) => {
    try {
      // Mostrar alerta de confirmación
      const result = await Swal.fire({
        title: "¿Desea eliminar este producto?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        // Eliminar el producto si se confirma
        await api.delete(`http://localhost:3001/eliminarProducto/${id}`);
        setProducts(products.filter((product) => product.id !== id));

        // Mostrar mensaje de éxito
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);

      // Mostrar mensaje de error
      Swal.fire("Error", "No se pudo eliminar el producto.", "error");
    }
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

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
          <h1 className="titH">Todos Los Productos</h1>
        </div>
        <div className=" text-end ms-3">
          <button
            className="btnAgregarP me-3"
            type="button"
            onClick={() => handleNavigate("/AdminCrearProduct")}
          >
            Agregar Producto
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table
            className="table table-bordered"
            style={{ borderColor: "#004AAD" }}
          >
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
                    <img
                      src={product.imagen_url}
                      alt={product.nombre}
                      className=" object-cover "
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleNavigate(`/AdminEditar/${product.id}`)
                      }
                      type="button"
                      className="btn"
                      style={{ color: "#002D6A" }}
                    >
                      Editar
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => handleEliminar(product.id)}
                      type="button"
                      className="btn"
                      style={{ color: "#002D6A" }}
                    >
                      Eliminar
                    </button>
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
