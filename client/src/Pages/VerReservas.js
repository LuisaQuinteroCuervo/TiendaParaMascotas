import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import axios from "axios";

const VerReservas = () => {
  const { id } = useParams(); // Obtén el id de la URL
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Hacer la solicitud al backend para obtener las reservas del usuario
    axios.get(`/reservasUsuario/${id}`)
      .then((response) => {
        setReservas(response.data); // Almacenar las reservas en el estado
      })
      .catch((error) => {
        console.log("Error al obtener las reservas:", error);
      });
  }, [id]); // Se ejecutará cada vez que cambie el id

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
