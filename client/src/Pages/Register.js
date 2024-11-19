import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Login&Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuthRendirect from "../hook/useAuthRendirect";

const Register = () => {
  useAuthRendirect();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función para validar el formato del email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!nombre.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingrese un nombre.",
      });
      return;
    }

    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingrese un correo electrónico.",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo electrónico no tiene un formato válido.",
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingrese una contraseña.",
      });
      return;
    }

    try {
      console.log("Enviando datos de registro al servidor:", {
        nombre,
        email,
        password,
      });
      const response = await api.post("http://localhost:3001/addUsuario", {
        nombre,
        email,
        password,
      });
      console.log("Respuesta del servidor:", response.data);

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Te has registrado correctamente! Serás redirigido al login.",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error del servidor",
        text: "Hubo un problema al registrarte. Por favor, intenta más tarde.",
      });
      console.error("Error de autenticación:", error);
    }
  };

  return (
    <div className="containerLogin">
      <div className="card-body">
        <h2 style={{ color: "#004AAD" }}>¡Registrate ahora!</h2>
        <br />
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            style={{ width: "80%" }}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerEmail">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            style={{ width: "80%" }}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            style={{ width: "80%" }}
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="registerCheck"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <button
          type="button"
          onClick={handleRegister}
          className="btn btn-primary btn-block mb-3"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Register;
