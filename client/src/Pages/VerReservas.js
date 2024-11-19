import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../styles/VerReservas.css";

const VerReservas = () => {
  const navigate = useNavigate();

  const { usuarioId } = useParams(); 
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (usuarioId) {
      axios
        .get(`http://localhost:3001/reservasUsuario/${usuarioId}`)
        .then((response) => {
          setReservas(response.data); 
        })
        .catch((error) => {
          console.error("Error al obtener las reservas:", error);
        });
    } else {
      console.error("usuarioId no está definido");
    }
  }, [usuarioId]);

  // Función para formatear la fecha
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toISOString().split("T")[0]; // Devuelve el formato YYYY-MM-DD
  };

  // Función para formatear la hora
  const formatearHora = (hora) => {
    const [hour, minute] = hora.split(":"); // Divide la hora en partes
    const hour12 = (hour % 12) || 12; // Convierte la hora a formato de 12 horas
    const ampm = hour >= 12 ? "pm" : "am"; // Determina si es am o pm
    return `${hour12}:${minute}${ampm}`; // Devuelve la hora en formato HH:mm am/pm
  };

  return (
    <div className="reservas-container">
      <h1>Listado de Reservas</h1>
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div className="reserva-card" key={reserva.id}> 
            <div className="reserva-info">
              <p><strong></strong> {reserva.usuarioId}</p>
              <p><strong>Tipo de servicio:</strong> {reserva.nombre_servicio}</p> 
              <p><strong>Fecha:</strong> {formatearFecha(reserva.fecha)}</p>
              <p><strong>Estado:</strong> {reserva.estado}</p>
              <p><strong>Hora:</strong> {formatearHora(reserva.hora)}</p>
              <p><strong>Precio:</strong> {reserva.precio}</p>

            </div>
          </div>
        ))
      ) : (
        <p>No tienes reservas.</p>
      )}
    </div>
  );
};

export default VerReservas;
