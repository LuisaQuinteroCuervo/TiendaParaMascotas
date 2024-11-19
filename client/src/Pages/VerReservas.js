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

  return (
    <div className="reservas-container">
      <h1>Listado de Reservas</h1>
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div className="reserva-card" key={reserva.id} > 
            <div className="reserva-info">
              <p><strong></strong> {reserva.usuarioId}</p>
              <p><strong>Tipo de servicio:</strong> {reserva.nombre_servicio}</p> 
              <p><strong>Fecha:</strong> {reserva.fecha}</p>
              <p><strong>Hora:</strong> {reserva.hora}</p>
              <p><strong>Estado:</strong> {reserva.estado}</p>
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
