import "./App.css";
import "./index.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

///Componentes
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

///Paginas Clientes
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import VistaProduct from "./Pages/VistaProduct";
import PagosProducts from "./Pages/PagosProducts";
import CrearReservas from "./Pages/CrearReservas";
import VerReservas from "./Pages/VerReservas";

///Paginas Admin
import AdminHome from "./Pages/AdminHome";
import AdminProductos from "./Pages/AdminProductos";
import AdminCrearProduct from "./Pages/AdminCrearProduct";

import AdminGestionPedidos from "./Pages/AdminGestionPedidos";
import AdminEditar from "./Pages/AdminEditar";

function App() {
  useEffect(() => {
    // Cargar script JS de Bootstrap dinámicamente
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup para eliminar el script cuando el componente se desmonta
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/VistaProduct/:id" element={<VistaProduct />} />
          <Route path="/PagosProducts" element={<PagosProducts />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminProductos" element={<AdminProductos />} />
          <Route path="/AdminCrearProduct" element={<AdminCrearProduct />} />

          <Route
            path="/AdminGestionPedidos"
            element={<AdminGestionPedidos />}
          />
          <Route path="/AdminEditar/:id" element={<AdminEditar />} />
          <Route path="/CrearReservas" element={<CrearReservas />} />
          <Route path="/VerReservas/:usuarioId" element={<VerReservas />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
