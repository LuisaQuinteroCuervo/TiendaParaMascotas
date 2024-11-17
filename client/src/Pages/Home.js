import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import api from "../api/api";
import "../styles/Home.css";
import ProductCard from "../Components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `http://localhost:3001/productosPorCategoria?categoria=${category}`
          : "http://localhost:3001/productos";
        const response = await api.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, [category]); // Vuelve a cargar los productos cuando la categoría cambia

  return (
    <div className="Home">
      {/* Carrusel */}
      <Carousel className="Carousel">
        <Carousel.Item>
          <img
            src="/client/src/assets/img/Carrusel_instagram_1.png"
            alt="First slide"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/client/src/assets/img/carrusel1.jpg"
            alt="Second slide"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/client/src/assets/img/carrusel1.jpg"
            alt="Third slide"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Botón de Filtros */}
      <p style={{ color: "#004AAD" }}>
        __________________________________________________________________________________________________________________________________________________________________________________
      </p>
      <div className="Filtros">
        <h2 className="nameP">Productos Minky</h2>
        <DropdownButton
          id="dropdown-categories"
          title="Filtrar por Categoría"
          onSelect={(eventKey) => setCategory(eventKey)} // Cambiar la categoría seleccionada
        >
          <Dropdown.Item eventKey="">Sin Filtros</Dropdown.Item>
          <Dropdown.Item eventKey="Alimentos">Alimentos</Dropdown.Item>
          <Dropdown.Item eventKey="Juguetes">Juguetes</Dropdown.Item>
          <Dropdown.Item eventKey="Accesorios">Accesorios</Dropdown.Item>
          <Dropdown.Item eventKey="Medicamentos">Medicamentos</Dropdown.Item>
        </DropdownButton>
      </div>

      {/* Productos Cards */}
      <div className="Productos">
        <div className="ProductosCards">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map((product) => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <p style={{ color: "#004AAD" }}>
        __________________________________________________________________________________________________________________________________________________________________________________
      </p>
    </div>
  );
};

export default Home;
