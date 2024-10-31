const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "biblioteca",
});

// Ver todos los prestamos //YA ESTAAAAAAAAAAAAA
app.get("/prestamos", (req, res) => {
  const sqlSelect = "SELECT * FROM VistaPrestamos";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});




// Ver el historial de los prestamos //YA ESTAAAAAAAAAAAAAAAAAAA
app.get("/historial", (req, res) => {
  const sqlSelect = "SELECT * FROM VistaHistorial";
  db.query(sqlSelect, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
  });
});

// Ver el Libros /// YA ESTAAAAAAAAAAA
app.get("/Libros", (req, res) => {
  const sqlSelect = "SELECT * FROM Libro";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// Registrar prestamo //YA ESTAAAAA
app.post("/addPrestamo", (req, res) => {
  const { cedula, nombreCompleto, carrera, correo, numero, tituloLibro } =
    req.body;
  const sqlInsert = "CALL RegistrarPrestamo(?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [cedula, nombreCompleto, carrera, correo, numero, tituloLibro],
    (err, result) => {
      if (err) console.log(err);
      else res.send("Prestamo registrado");
    }
  );
});

// Registrar libro 4 //YA ESTAAAAAA
app.post("/addLibro", (req, res) => {
  const { tituloLibro, editorial, autor, fecha, campoEstudio, cantidad } =
    req.body;
  const sqlInsert = "CALL InsertarLibro(?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [tituloLibro, editorial, autor, fecha, campoEstudio, cantidad],
    (err, result) => {
      if (err) console.log(err);
      else res.send("Libro registrado");
    }
  );
});

// Actualizar estado del prestamo (devolucion del libro)
app.post("/actualizarEstado", (req, res) => {
  const { idPrestamo } = req.body; // el id del registro del prestamo
  const sqlInsert = "CALL ActualizarEstado(?);";
  db.query(sqlInsert, [idPrestamo], (err, result) => {
    if (err) console.log(err);
    else res.send("estado del prestamo actualizado: " + idPrestamo);
  });
});

// Ver el historial de los prestamos
app.get("/historial", (req, res) => {
  const sqlSelect = "SELECT * FROM VistaHistorial";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// Validar usuario (inicio de sesion) YaA ESTAAAAAAAAAAAA
app.post("/validarUsuario", (req, res) => {
  const { nombreUsuario, contrasena } = req.body;
  const sqlInsert = "CALL ValidateUser(?,?);";
  db.query(sqlInsert, [nombreUsuario, contrasena], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // Obtener el resultado del procedimiento almacenado
      const resultado = result[0][0].Resultado;
      if (resultado) {
        res.send("usuario validado");
      } else {
        res.send("usuario no validado");
      }
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
