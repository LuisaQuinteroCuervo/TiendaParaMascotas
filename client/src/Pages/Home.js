import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import api from "../api/api";
import "../styles/Home.css";
import ProductCard from "../Components/ProductCard";
import carrusel1 from "../assets/img/carrusel1.png";
import carrusel2 from "../assets/img/carrusel2.png";
import carrusel3 from "../assets/img/carrusel3.png";

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
      <Carousel
        className="Carousel"
        style={{ width: "100.6%", height: "400px", marginLeft: "-50vw", left: "50%" }}
      >
        <Carousel.Item>
          <img
            src={carrusel1}
            alt="First slide"
            style={{ width: "100.6%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={carrusel2}
            alt="Second slide"
            style={{ width: "100.6%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={carrusel3}
            alt="Third slide"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Botón de Filtros */}
      <p style={{ color: "#004AAD" }}>
        __________________________________________________________________________________________________________________________________________________________________________________
      </p>
      <div className="Filtros d-flex justify-content-center" style={{ gap: "30px" }}>
        <h2 className="nameP" style={{ color: "#004AAD", fontSize: "40px" }}>Productos Minky</h2>
        <DropdownButton
          id="dropdown-categories"
          title="Filtrar por Categoría"
          onSelect={(eventKey) => setCategory(eventKey)} // Cambiar la categoría seleccionada
          className="ms-auto me-3"
          style={{ alignSelf: "center" }}
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
              <div
                className="col d-flex justify-content-center"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <p style={{ color: "#004AAD" }}>
        __________________________________________________________________________________________________________________________________________________________________________________
      </p>
      <div className="Comunicado">
        <h3 >Lo mejor para tu compañero más leal, siempre a tu alcance.</h3>
        <div className="palabras">
          <div className="palabras-section">
            <h2 style={{ color: "#004AAD" }}>Servicio rapido y confiable</h2>
            <p>Lleva felicidad a tu mascota en cuestión de horas. ¡Recibe el mismo día!</p>
          </div>

          <div className="palabras-section">
            <h2 style={{ color: "#004AAD" }}>Todo en un solo lugar </h2>
            <p>Explora entre miles de productos y servicios para consentir a tu amigo peludo.</p>
          </div>

          <div className="palabras-section">
            <h2 style={{ color: "#004AAD" }}>Bienestar garantizado</h2>
            <p>Desde comida premium hasta juguetes irresistibles. Tu peludo lo vale.</p>
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
