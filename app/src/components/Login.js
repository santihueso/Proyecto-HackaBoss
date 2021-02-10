import React, { useState } from "react";
import { port } from "./Principal";
import { UserFormLogIn } from "./UseForm";
import { useHistory, Link } from "react-router-dom";
import "../css/login-signin.css";

const Login = ({ setAuth }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json();

    if (res.status !== 200) {
      console.log(body);
      setAuth("");
      setError(body.error);
    } else {
      history.push("/principal");
      window.localStorage.setItem("auth", JSON.stringify(body.token));
      setAuth(body.token);
    }
  };
  return (
    <div className="login">
      <p>Iniciar sesión</p>
      <UserFormLogIn
        handlSubmit={handlSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        err={error}
      ></UserFormLogIn>

      <Link to="/signin">Registrarse</Link>
      <Link to="/changePassword"> Recuperar contraseña</Link>
    </div>
  );
};

export { Login };
