import Carousel from "react-bootstrap/Carousel";
import api from "../api/api";
import "../styles/Home.css";
import ProductCard from "../Components/ProductCard";
import React, { useEffect } from "react";


const Home = () => {

  const [products, setProducts] = React.useState([]);

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



  return (
    <div className="Home">
      <Carousel className="Carousel">
        <Carousel.Item>
          <img
            src="/client/src/assets/img/Carrusel_instagram_1.png"
            alt="First slide"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/client/src/assets/img/carrusel1.jpg"
            alt="First slide"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/client/src/assets/img/carrusel1.jpg"
            alt="First slide"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Categorias*/}
      <div className="Categorias">
        <h2 className="nameC">Categorías</h2>
        <div className="itemsCategorias">
          <div className="itemC">
            <button className="btnCategoria btnCategoria1"></button>
            <p>Alimentos</p>
          </div>
          <div className="itemC">
            <button className="btnCategoria btnCategoria2"></button>
            <p>Juguetes</p>
          </div>
          <div className="itemC">
            <button className="btnCategoria btnCategoria3"></button>
            <p>Accesorios</p>
          </div>
          <div className="itemC">
            <button className="btnCategoria btnCategoria4"></button>
            <p>Medicamentos</p>
          </div>
        </div>
      </div>

      {/* Productos Cards*/}
      <p style={{ color: "#004AAD" }}>
        __________________________________________________________________________________________________________________________________________________________________________________
      </p>

      <div className="Productos">
        <h2 className="nameP">Favoritos Minky</h2>

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





    

      {/* Informaciones*/}

      <p style={{ color: "#004AAD" }}>
        __________________________________________________________________________________________________________________________________________________________________________________
      </p>

      <div className="Categorias">
        <h2 className="nameC">
          Lo mejor para tu compañero más leal, siempre a tu alcance.
        </h2>
        <div className="itemsCategorias">
          <div className="itemC">
            <h1>Servicio rapido y confiable</h1>
            <p>
              Lleva felicidad a tu mascota en cuestión de horas. ¡Recibe el
              mismo día!
            </p>
          </div>
          <div className="itemC">
            <h1>Todo en un solo lugar </h1>
            <p>
              Explora entre miles de productos y servicios para consentir a tu
              amigo peludo.
            </p>
          </div>
          <div className="itemC">
            <h1>Bienestar garantizado</h1>
            <p>
              Desde comida premium hasta juguetes irresistibles. Tu peludo lo
              vale.
            </p>
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
