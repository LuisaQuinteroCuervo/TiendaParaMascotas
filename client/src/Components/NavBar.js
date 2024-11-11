import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/NavBar.css";
import { Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Navbar className="header sticky-top" expand="lg" style={{ zIndex: 1000 }}>
      <Container>
        <Navbar.Brand href="#">
          <div className="logo"></div>
        </Navbar.Brand>
        <input
          className="form-control inputBusqueda"
          value={""}
          placeholder="¿Qué necesita tu mascota?"
        />
        <button
          className="btn btn-success"
          style={{ backgroundColor: "#002D6A", color: "#FFFFFF", border: "none" }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <Navbar.Collapse className="justify-content-end">
          <button className="botonNav" onClick={handleNavigate}>
            Crear cuenta
          </button>
        </Navbar.Collapse>
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
