const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "tiendamascotas",
});

function verificarOCrearAdmin() {
  const sqlSelect = "SELECT * FROM Usuarios WHERE rol = 'administrador' LIMIT 1";
  
  //ver si ya existe un administrador
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log("Error al verificar el administrador:", err);
    } else if (result.length === 0) {
      //crear uno con contraseña encriptada
      const adminPassword = "admin123";
      
      bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.log("Error al encriptar la contraseña del administrador:", err);
        } else {
          const sqlInsert = "CALL CrearAdmin(?, ?, ?)";
          const nombreAdmin = "admin";
          const emailAdmin = "adminUser";
          
          db.query(sqlInsert, [nombreAdmin, emailAdmin, hashedPassword], (err, result) => {
            if (err) {
              console.log("Error al crear el administrador:", err);
            } else {
              console.log("Usuario administrador creado con éxito");
            }
          });
        }
      });
    } else {
      console.log("Administrador ya existente");
    }
  });
}

// Crear usurario (solo crea Clientes) LISTO
app.post("/addUsuario", (req, res) => {
  const { nombre, email, password } = req.body;
  const sqlInsert = "CALL CrearUsuario(?,?,?);";

  //encriptar la contraseña antes de guardarla
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error en la encriptación de la contraseña");
    } else {
      db.query(sqlInsert, [nombre, email, hashedPassword], (err, result) => {
        if (err) console.log(err);
        else res.send("Usuario registrado");
      });
    }
  });
});

// login LISTO
app.post("/validarUsuario", (req, res) => {
  try {
    const { email, password } = req.body;

    const sqlSelect = "SELECT password FROM Usuarios WHERE email = ?";
    db.query(sqlSelect, [email], (err, result) => {
      if (err) {
        console.error("Error ejecutando sqlSelect:", err);
        return res.status(500).json({ message: "Error en la base de datos" });
      }

      if (result.length > 0) {
        const hashedPassword = result[0].password;

        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error("Error en bcrypt.compare:", err);
            return res.status(500).json({ message: "Error en bcrypt" });
          }

          if (isMatch) {
            const sqlCall = "SELECT ValidarUsuario(?, ?) AS rol;";
            db.query(sqlCall, [email, hashedPassword], (err, result) => {
              if (err) {
                console.error("Error ejecutando sqlCall:", err);
                return res
                  .status(500)
                  .json({ message: "Error al obtener el rol del usuario" });
              }

              const rol = result[0]?.rol || null;
              if (rol) {
                res.json({ message: "Usuario validado", role: rol });
              } else {
                res.status(400).json({ message: "Usuario no validado" });
              }
            });
          } else {
            res.status(401).json({ message: "Contraseña incorrecta" });
          }
        });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    });
  } catch (error) {
    console.error("Error general en /validarUsuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});



// ver productos administradores LISTO
app.get("/productos", (req, res) => {
  const sqlSelect = "SELECT * FROM ListaProductos";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//crear producto LISTO
app.post("/addProducto", (req, res) => {
  const { nombre, descripcion, categoria, precio, imagenUrl, stock } = req.body;
  const sqlInsert = "CALL CrearProducto(?, ?, ?, ?, ?, ?);";
  db.query(sqlInsert, [nombre, descripcion, categoria, precio, imagenUrl, stock], (err, result) => {
    if (err) console.log(err);
    else res.send("Producto registrado");
  });
});

//editar producto LISTO
app.put("/modificarProducto/:id", (req, res) => { 
  const  id  = req.params.id;  
  const { nombre, descripcion, categoria, precio, imagenUrl, stock } = req.body;

  const sqlUpdate = "CALL ModificarProducto(?, ?, ?, ?, ?, ?, ?);";
  db.query(sqlUpdate, [id, nombre, descripcion, categoria, precio, imagenUrl, stock], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al modificar el producto");
    } else {
      res.json({ message: "Producto modificado", product: { id, nombre, descripcion, categoria, precio, imagenUrl, stock } });
    }
  });
});

// eliminar producto LISTO
app.delete("/eliminarProducto/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "CALL EliminarProducto(?);";
  db.query(sqlDelete, [id], (err, result) => {
    if (err) console.log(err);
    else res.send("Producto eliminado");
  });
});

// ver solo un producto LISTO
app.get("/producto/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect = "CALL ObtenerProductoPorID(?);";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result[0][0]);
  });
});




// crear reservas LISTO
app.post("/addReserva", (req, res) => {
  const { usuarioId, servicioId, fecha, hora } = req.body;
  const sqlInsert = "CALL CrearReserva(?, ?, ?, ?);";
  db.query(sqlInsert, [usuarioId, servicioId, fecha, hora], (err, result) => {
    if (err) console.log(err);
    else res.send("Reserva registrada");
  });
});

// ver reservas usuarios
app.get("/reservasUsuario/:usuarioId", (req, res) => {
  const usuarioId = req.params.usuarioId;
  const sqlSelect = "CALL ObtenerReservasUsuario(?);";
  db.query(sqlSelect, [usuarioId], (err, result) => {
    if (err) console.log(err);
    else res.send(result[0]);
  });
});


app.post("/editarEstadoReserva", (req, res) => {
  const { reservaId, nuevoEstado } = req.body;
  const sqlCall = "CALL EditarEstadoReserva(?, ?);";

  db.query(sqlCall, [reservaId, nuevoEstado], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al editar el estado de la reserva");
    } else {
      res.send(`Estado de la reserva ${reservaId} actualizado a ${nuevoEstado}`);
    }
  });
});


// ver reservas administradores
app.get("/reservas", (req, res) => {
  const sqlSelect = "SELECT * FROM VistaReservas";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});





//ver productos clientes (ya tiene los filtros por categoria y disponibilidad)
app.get("/productosPorCategoria", (req, res) => {
  const { categoria } = req.query;
  const sqlSelect = "CALL ObtenerProductosPorCategoria(?);";
  db.query(sqlSelect, [categoria || null], (err, result) => {
    if (err) console.log(err);
    else res.send(result[0]);
  });
});

//crear un pedido
app.post("/addPedido", (req, res) => {
  const { usuarioId, productos } = req.body;
  const sqlInsert = "CALL CrearPedido(?, ?);";
  db.query(sqlInsert, [usuarioId, JSON.stringify(productos)], (err, result) => {
    if (err) console.log(err);
    else res.send("Pedido registrado");
  });
});

//ver productos de un pedido 
app.get("/pedidoProductos/:pedidoId", (req, res) => {
  const pedidoId = req.params.pedidoId;
  const sqlSelect = "CALL ObtenerPedidoProductosPorID(?);";
  db.query(sqlSelect, [pedidoId], (err, result) => {
    if (err) console.log(err);
    else res.send(result[0]);
  });
});

// ver pedidos administrador
app.get("/pedidos", (req, res) => {
  const sqlSelect = "SELECT * FROM VistaPedidos";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// editar estado del pedidos
app.post("/editarEstadoPedido", (req, res) => {
  const { pedidoId, nuevoEstado } = req.body;
  const sqlUpdate = "CALL EditarEstadoPedido(?, ?);";
  db.query(sqlUpdate, [pedidoId, nuevoEstado], (err, result) => {
    if (err) console.log(err);
    else res.send(`Estado del pedido ${pedidoId} actualizado a ${nuevoEstado}`);
  });
});

//ver pedidos usuarios
app.get("/pedidosUsuario/:usuarioId", (req, res) => {
  const usuarioId = req.params.usuarioId;
  const sqlSelect = "CALL ObtenerPedidosUsuario(?);";
  db.query(sqlSelect, [usuarioId], (err, result) => {
    if (err) console.log(err);
    else res.send(result[0]);
  });
});

// agregar un producto al carrito
app.post("/addProductoAlCarrito", (req, res) => {
  const { usuarioId, productoId, cantidad } = req.body;
  const sqlInsert = "CALL AgregarProductoAlCarrito(?, ?, ?);";
  db.query(sqlInsert, [usuarioId, productoId, cantidad], (err, result) => {
    if (err) console.log(err);
    else res.send("Producto agregado al carrito");
  });
});

app.get("/carrito/:usuarioId", (req, res) => {
  const usuarioId = req.params.usuarioId;
  const sqlCall = "CALL ObtenerProductosCarrito(?);";

  db.query(sqlCall, [usuarioId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener productos del carrito");
    } else {
      res.send(result[0]);
    }
  });
});

app.delete("/carrito/eliminarProducto", (req, res) => {
  const { usuarioId, productoId } = req.body;
  const sqlCall = "CALL EliminarProductoDelCarrito(?, ?);";

  db.query(sqlCall, [usuarioId, productoId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar el producto del carrito");
    } else {
      res.send("Producto eliminado del carrito");
    }
  });
});


db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos");

  //verificar o crear administrador
  verificarOCrearAdmin();
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});