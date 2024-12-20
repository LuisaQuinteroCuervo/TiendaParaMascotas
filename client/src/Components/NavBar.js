import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/NavBar.css";
import { Navbar, Container} from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const handleLogout = (path) => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");  // Eliminar el rol al cerrar sesión
    navigate(path);
  };

  const userRole = localStorage.getItem("rol");  // Obtenemos el rol del usuario

  // Función para redirigir al hacer clic en el logo
  const handleLogoClick = () => {
    if (userRole === "administrador") {
      navigate("/AdminHome");
    } else {
      navigate("/Home");
    }
  };

  return (
    <Navbar className="header sticky-top" expand="lg" style={{ zIndex: 1000 }}>
      <Container>
        <Navbar.Brand href="#" onClick={handleLogoClick}>
          <div className="logo"></div>
        </Navbar.Brand>
        <input
          className="form-control inputBusqueda"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="¿Qué necesita tu mascota?"
        />
        <button
          className="btn btn-success"
          style={{
            backgroundColor: "#002D6A",
            color: "#FFFFFF",
            border: "none",
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {localStorage.getItem("token") ? (
          <Navbar.Collapse className="justify-content-end">
            <button
              className="botonNav"
              type="button"
              onClick={() => handleLogout('/login')}
            >
              Logout
            </button>

            {userRole === "administrador" ? (
              <button
                className="botonNav"
                type="button"
                onClick={() => navigate('/AdminReserva')}
              >
                Ver Reservas
              </button>
            ) : (
              <button
                className="botonNav"
                type="button"
                onClick={() => navigate('/CrearReservas')}
              >
                Reservas
              </button>
            )}
          </Navbar.Collapse>
        ) : (
          <>
            <Navbar.Collapse className="justify-content-end">
              <button
                className="botonNav"
                type="button"
                onClick={() => navigate("/Login")}
              >
                Login
              </button>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <button
                className="botonNav"
                type="button"
                onClick={() => navigate("/Register")}
              >
                Crear Cuenta
              </button>
            </Navbar.Collapse>
          </>
        )}
        <Navbar.Collapse className="justify-content-end">
          <button
            className="btn btn-success"
            style={{ backgroundColor: "#002D6A", color: "#FFFFFF" }}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
