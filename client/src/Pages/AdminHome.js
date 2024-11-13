import { useNavigate } from "react-router-dom";
import "../styles/HomeAdmin.css";


const AdminHome  = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path)
    }

return(
    <div className="containerM">
      <div className="row rowMenu ">
        <div className="col coll order-first">
          <ul></ul>
          <button 
          className="botonH"
          type="button"
          onClick={() => handleNavigate('/AdminProductos')}
          >Productos</button>
        </div>
        <div className="col coll order-medio">

          <button 
          className="botonH1"
          type="button"
          onClick={() => handleNavigate('/AdminGestionPedidos')}
          >Pedidos</button>
        </div>
        </div>
        </div>
)
}
export default AdminHome;