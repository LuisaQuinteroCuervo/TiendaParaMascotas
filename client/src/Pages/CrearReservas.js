import "../styles/AdminCrearProduct.css";
import api from "../api/api";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CrearReservas = () => {
  const navigate = useNavigate();

  const [newServicio, setNewServicio] = React.useState({
    usuarioId: "",
    servicioId: "",
    fecha: "",
    hora: "",
  });

  // Obtén el usuarioId desde el localStorage
  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
      setNewServicio((prevState) => ({ ...prevState, usuarioId }));
    }
  }, []);

  // Maneja la creación de reservas
  const handleCrearReserva = async (e) => {
    e.preventDefault();
    const { usuarioId, servicioId, fecha, hora } = newServicio;

    // Validar que todos los campos estén completos
    if (!usuarioId || !servicioId || !fecha || !hora) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de continuar.",
      });
      return;
    }

    try {
      // Enviar la reserva al servidor
      const response = await api.post(
        "http://localhost:3001/addReserva",
        newServicio
      );
      console.log("Respuesta del servidor:", response.data);

      // Restablecer el formulario
      setNewServicio({
        usuarioId: newServicio.usuarioId,
        servicioId: "",
        fecha: "",
        hora: "",
      });

      // Notificar éxito y redirigir al usuario
      Swal.fire({
        icon: "success",
        title: "Reserva creada",
        text: "La reserva se creó con éxito. ¡Gracias por usar nuestro servicio!",
      }).then(() => {
        navigate(`/VerReservas/${newServicio.usuarioId}`);
      });
    } catch (error) {
      if (error.response) {
        console.log("Detalles del error:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data || "Ocurrió un error al crear la reserva.",
        });
      } else {
        console.log("Error desconocido:", error);
        Swal.fire({
          icon: "error",
          title: "Error desconocido",
          text: "No se pudo crear la reserva. Inténtelo más tarde.",
        });
      }
    }
  };

  // Maneja la navegación para ver reservas
  const handleVerReservas = () => {
    if (newServicio.usuarioId) {
      navigate(`/VerReservas/${newServicio.usuarioId}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario no identificado. Por favor, inicie sesión.",
      });
    }
  };

  return (
    <div className="containerCrear">
      <form
        onSubmit={handleCrearReserva}
        style={{ margin: "20px" }}
        className="containerForm"
      >
        <h2 className="tituloAgregar">Agendar un Servicio</h2>
        <br />

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="usuarioId">
            ID Usuario
          </label>
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
          <label className="form-label" htmlFor="servicio">
            Seleccione el Servicio
          </label>
          <select
            id="servicio"
            name="servicioId"
            value={newServicio.servicioId}
            onChange={(e) =>
              setNewServicio({ ...newServicio, servicioId: e.target.value })
            }
            className="form-control"
            required
          >
            <option value="">Seleccione un servicio </option>
            <option value="1">Baño y Cepillado - 30.00</option>
            <option value="2">Corte de Pelo - 40.00 </option>
            <option value="3">Corte de Uñas - 15.00</option>
            <option value="4">Limpieza de Oídos - 20.00</option>
            <option value="5">Desparasitación - 25.00</option>
          </select>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="fecha">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={newServicio.fecha}
            onChange={(e) =>
              setNewServicio({ ...newServicio, fecha: e.target.value })
            }
            className="form-control"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="hora">
            Hora
          </label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={newServicio.hora}
            onChange={(e) =>
              setNewServicio({ ...newServicio, hora: e.target.value })
            }
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-default">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={handleVerReservas}
          >
            Ver reservas
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearReservas;
