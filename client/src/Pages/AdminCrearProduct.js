import "../styles/AdminCrearProduct.css";

const AdminCrerarProduct = () => {
  return (
    <div className="containerCrear">
      <form className="containerForm">
        <h2 className="tituloAgregar">Crear Nuevo Producto</h2>
        <br />
        {/* Nombre */}
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example1">
            Nombre
          </label>
          <input type="text" id="form7Example1" className="form-control" />
        </div>

        {/* Precio */}
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example2">
            Precio
          </label>
          <input type="number" id="form7Example2" className="form-control" />
        </div>

        {/* Descrpcion */}
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example2">
            Descrpcion
          </label>
          <input type="text" id="form7Example2" className="form-control" />
        </div>

        {/* Categoría */}
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example4">
            Category
          </label>
          <select id="form7Example4" className="form-control">
            <option value="alimentos">Alimentos</option>
            <option value="juguetes">Juguetes</option>
            <option value="accesorios">Accesorios</option>
            <option value="medicamentos">Medicamentos</option>
          </select>
        </div>

        {/* Imagen */}
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form7Example5">
            Image
          </label>
          <input type="file" id="form7Example5" className="form-control" />
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCrerarProduct;
