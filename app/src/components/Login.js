import React, { useState } from "react";
import { port } from "./Principal";
import { UserFormLogIn } from "./UseForm";
import { Link } from "react-router-dom";
import "../css/login-signin.css";

const Login = ({ setAuth }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(false);
  const hiddenView = hidden ? { display: "none" } : { display: "block" };
  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json();

    if (res.status !== 200) {
      setAuth("");
      setError(body.error);
      setHidden(false);
    } else {
      window.localStorage.setItem("auth", JSON.stringify(body.token));
      setAuth(body.token);
      setHidden(true);
    }
  };
  return (
    <section className="wrapper" style={hiddenView}>
      <section className="login" style={hiddenView}>
        <button onClick={() => setHidden(true)}>x</button>
        <p>Iniciar sesión</p>
        <UserFormLogIn
          handlSubmit={handlSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          err={error}
        ></UserFormLogIn>
        <Link to="/forgetPass"> Recuperar contraseña</Link>
      </section>
    </section>
  );
};

export { Login };
