import "./App.css";
import "./index.css";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
///Componentes
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

///Paginas Clientes
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import VistaProduct from "./Pages/VistaProduct";
import PagosProducts from "./Pages/PagosProducts";

///Paginas Admin  
import AdminHome from "./Pages/AdminHome";
import AdminProductos from "./Pages/AdminProductos";      
import AdminCrearProduct from "./Pages/AdminCrearProduct";
import AdminVistaProductos from "./Pages/AdminVistaProductos";
import AdminGestionPedidos from "./Pages/AdminGestionPedidos";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<AdminGestionPedidos  />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/VistaProduct" element={<VistaProduct/>} />
          <Route path="/PagosProducts" element={<PagosProducts/>} />
          <Route path="/AdminHome" element={<AdminHome/>} />
          <Route path="/AdminProductos" element={<AdminProductos/>} />
          <Route path="/AdminCrearProduct" element={<AdminCrearProduct/>} />
          <Route path="/AdminVistaProductos" element={<AdminVistaProductos/>} />
          <Route path="/AdminGestionPedidos" element={<AdminGestionPedidos/>} />

        </Routes>
      <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
