import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Swal from "sweetalert2";
import "../styles/Login&Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuthRedirect from "../hook/useAuthRendirect";

const Login = () => {
  useAuthRedirect();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingrese un correo electrónico.",
      });
      console.log("Error: Correo electrónico vacío");
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingrese una contraseña.",
      });
      console.log("Error: Contraseña vacía");
      return;
    }

    try {
      console.log("Enviando datos de login al servidor:", { email, password });
      const response = await api.post("/validarUsuario", { email, password });
      console.log("Respuesta del servidor:", response.data);

      const { message, role, token } = response.data;

      // Asegúrate de desestructurar correctamente `role`
      const { id: usuarioId, rol } = role;

      if (message === "Usuario validado") {
        localStorage.setItem("token", token);
        localStorage.setItem("usuarioId", usuarioId);
        localStorage.setItem("rol", rol); // Aquí guardamos el rol del usuario

        console.log("Usuario ID y rol guardado en localStorage:", usuarioId, rol);

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "¡Bienvenido!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          if (rol === "administrador") {
            navigate("/AdminHome");
            console.log("Redirigiendo a /AdminHome");
          } else if (rol === "User" || rol === "cliente") {
            navigate("/");
            console.log("Redirigiendo a /");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Credenciales incorrectas. Por favor, intenta nuevamente.",
        });
        console.log("Credenciales incorrectas");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error del servidor",
        text: "Hubo un problema al iniciar sesión. Por favor, intenta más tarde.",
      });
      console.error("Error de autenticación:", error);
    }
  };

  return (
    <div className="containerLogin">
      <div className="card-body">
        <h2 style={{ color: "#004AAD" }}>¡Bienvenidos de nuevo!</h2>
        <br />

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="loginName">
            Email
          </label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "80%" }}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="loginPassword">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "80%" }}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          onClick={handleLogin}
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <a
              onClick={() => navigate("/Register")}
              style={{ color: "#004AAD", cursor: "pointer" }}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
