import React, { useEffect } from "react";
import api from "../api/api";
import "../styles/AdminProductos.css";

const AdminReserva = () => {
  const [reservas, setReservas] = React.useState([]);


  const updateReserva = (updatedReserva) => {
    setReservas((prevReservas) =>
      prevReservas.map((reserva) =>
        reserva.id === updatedReserva.id ? updatedReserva : reserva
      )
    );
  };


  const handleEstadoChange = async (reservaId, nuevoEstado) => {
    console.log("ID de reserva recibido:", reservaId); // Verifica el valor de reservaId
    const estadoNormalizado = nuevoEstado.toLowerCase();
  
    try {
      console.log("Datos enviados al backend:", {
        reservaId,
        estadoNormalizado,
      });
  
      const response = await api.post(
        "http://localhost:3001/editarEstadoReserva",
        {
          reservaId,
          nuevoEstado,
        }
      );
  
      console.log(response.data);
  
      // Actualizar el estado local
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.id === reservaId
            ? { ...reserva, estado: estadoNormalizado } // Asegúrate de actualizar la propiedad 'estado'
            : reserva
        )
      );
    } catch (error) {
      console.error("Error al editar el estado de la reserva:", error);
    }
  };
  

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get("http://localhost:3001/reservas");
        console.log(response.data);
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 text-start">
          <h1 className="titH">Todas las Reservas</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table
            className="table table-bordered"
            style={{ borderColor: "#004AAD" }}
          >
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Usuario</th>
                <th scope="col">Servicio seleccionado</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
            {reservas.map((reserva) => {

  return (
    <tr key={reserva.id}>
      <th scope="row">{reserva.id}</th>
      <td>{reserva.nombre_usuario}</td>
      <td>{reserva.nombre_servicio || 'Servicio no disponible'}</td>
      <td>{reserva.fecha}</td>
      <td>{reserva.hora}</td>
      <td>
      <select
  value={reserva.estado} // Cambia 'nuevoEstado' a 'estado'
  onChange={(e) => handleEstadoChange(reserva.id, e.target.value)} 
>

          <option value="pendiente">Pendiente</option>
          <option value="aprobado">aprobado</option>
          <option value="cancelado">Cancelada</option>
        </select>
      </td>
    </tr>
  );
})}

</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReserva;
