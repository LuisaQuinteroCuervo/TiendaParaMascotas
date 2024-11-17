import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";

const VerReservas = () => {
  const { id } = useParams(); 
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
   
    axios.get(`/reservasUsuario/${id}`)
      .then((response) => {
        setReservas(response.data); 
      })
      .catch((error) => {
        console.log("Error al obtener las reservas:", error);
      });
  }, [id]); 

  return (
    <div className="reservas-container">
      <h1>Listado de Reservas</h1>
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div className="reserva-card" key={reserva.id}>
            <div className="reserva-info">
              <p><strong>Usuario ID:</strong> {reserva.usuarioId}</p>
              <p><strong>Fecha:</strong> {reserva.fecha}</p>
              <p><strong>Hora:</strong> {reserva.hora}</p>
            </div>
            <div className="reserva-actions">
              <button className="btn-edit">Editar Reserva</button>
              <button className="btn-delete">Eliminar Reserva</button>
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
