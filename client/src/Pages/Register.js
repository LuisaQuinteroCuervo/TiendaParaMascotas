import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login&Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuthRendirect from "../hook/useAuthRendirect";

const Register = () => {
    useAuthRendirect();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {

    if (!nombre.trim()) {
        setErrorMessage("Por favor, ingrese un nombre.");
        console.log("Error: Nombre vacío");
        return;
      }
    if (!email.trim()) {
      setErrorMessage("Por favor, ingrese un correo electrónico.");
      console.log("Error: Correo electrónico vacío");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Por favor, ingrese una contraseña.");
      console.log("Error: Contraseña vacía");
      return;
    }

    try {
      console.log("Enviando datos de login al servidor:", {
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
      navigate("/login");
    } catch (error) {
        setErrorMessage("Error en el servidor, por favor intente más tarde.");
        console.error("Error de autenticación:", error);
    }
  };

  return (
    <div className="containerLogin">
      <div className="card-body">
        <h2 style={{ color: "#004AAD" }}>¡Registrate ahora!</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <br></br>

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
