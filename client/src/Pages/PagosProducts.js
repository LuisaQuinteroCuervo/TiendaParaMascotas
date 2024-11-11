import "../styles/PagosProducts.css";

const PagosProducts = () => {
  return (
    <div className="DatosPedido">
        <form className="containerDatos">
        <h1 className="TituloDatos">Tus Datos</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-controls"
          placeholder="Nombres"/>
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-controls"
          placeholder="Apellidos"/>
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-controls"
          placeholder="Numero de Documento"
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-controls"
          placeholder="Telefono/Movil"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-controls"
          placeholder="Correo Electronico"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-controls"
          placeholder="Direccion"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-controls"
          placeholder="Modo de Pago"
        />
      </div>
      </form>

      <form className="containerDatos">
        <h1 className="TituloDatos">Mi Bolsa</h1>
      
      </form>

      <form className="containerDatos" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', margin: '0 auto' }}>
  <h1 className="TituloCupon">Cupon de descuentos</h1>
  <div className="form-group" >
    <input
      type="text"
      className="form-controlss"
      placeholder="Codigo"

    />
    <button className="btnDescuento" >Aplicar</button>
  </div>
  <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }}>
  <p style={{ marginRight: '20px' }}>Descuentos</p>
  <input
    type="number"
    className="form-controlss"
    placeholder=""
    style={{ width: '50%' }}
  />
</div>

<div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }}>
  <p style={{ marginRight: '40px' }}>Total</p>
  <input
    type="number"
    className="form-controlss"
    placeholder=""
    style={{ width: '50%' }}
  />
</div>

  <button className="btnComprar" style={{ marginTop: '20px' }}>Comprar Ahora</button>
</form>

<p style={{ color: "#004AAD" }}>
        __________________________________________________________________________________________________________________________________________________________________________________
      </p>
    </div>
  );
};
export default PagosProducts;
