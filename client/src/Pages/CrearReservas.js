import "../styles/AdminCrearProduct.css";
import api from "../api/api";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CrearReservas = () => {
  const navigate = useNavigate();
  const [newServicio, setNewServicio] = React.useState({
    usuarioId: "", 
    servicioId: "",
    fecha: "",
    hora: ""
  });

  // Cargar el usuarioId automáticamente
  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    console.log("Usuario ID obtenido:", usuarioId); 
    if (usuarioId) {
      setNewServicio(prevState => ({ ...prevState, usuarioId }));
    }
  }, []);
  

  const handleCrearReserva = async (e) => {
    e.preventDefault();
    const { usuarioId, servicioId, fecha, hora } = newServicio;

    if (!usuarioId || !servicioId || !fecha || !hora) {
      alert("Por favor, ingrese todos los datos de la reserva.");
      return;
    }

    try {
      const response = await api.post("http://localhost:3001/addReserva", newServicio);
      setNewServicio({
        usuarioId, // No limpiamos usuarioId ya que es el mismo
        servicioId: "",
        fecha: "",
        hora: ""
      });
      alert("Reserva creada con éxito.");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log("Detalles del error: ", error.response.data);
        alert(error.response.data);
      } else {
        console.log("Error desconocido: ", error);
        alert("Error desconocido al crear la reserva.");
      }
    }
  };

  return (
    <div className="containerCrear">
      <form onSubmit={handleCrearReserva} style={{ margin: "20px" }} className="containerForm">
        <h2 className="tituloAgregar">Agendar un Servicio</h2>
        <br />

        {/* Ocultamos el campo usuarioId o lo mostramos como deshabilitado */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="usuarioId">ID Usuario</label>
          <input
            type="text"
            id="usuarioId"
            name="usuarioId"
            value={newServicio.usuarioId}
            className="form-control"
            disabled
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="servicio">Seleccione el Servicio</label>
          <select
            id="servicio"
            name="servicioId"
            value={newServicio.servicioId}
            onChange={(e) => setNewServicio({ ...newServicio, servicioId: e.target.value })}
            className="form-control"
            required
          >
            <option value="">Seleccione un servicio</option>
            <option value="1">Baño y Cepillado</option>
            <option value="2">Corte de Pelo</option>
            <option value="3">Corte de Uñas</option>
            <option value="4">Limpieza de Oídos</option>
            <option value="5">Desparasitación</option>
          </select>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={newServicio.fecha}
            onChange={(e) => setNewServicio({ ...newServicio, fecha: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="hora">Hora</label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={newServicio.hora}
            onChange={(e) => setNewServicio({ ...newServicio, hora: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-default">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default CrearReservas;
