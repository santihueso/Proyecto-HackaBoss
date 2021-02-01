import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useFetchData } from "../useFetchData";
import { port } from "./Principal";
//import { useLocation } from "wouter";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  // };

  return (
    <form>
      <h1>¡Bienvenido de nuevo</h1>
      <h3>Escribe tus detalles abajo</h3>
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        type="password"
        placeholder="contraseña"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <button>Iniciar sesión</button>
      <br />
    </form>
  );
};

const Options = () => {
  return (
    <div>
      <button>Recuperar contraseña</button>
      <button>Registrarse</button>
    </div>
  );
};

export { Login };
