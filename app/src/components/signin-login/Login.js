import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { UserFormSignIn } from "./UseForm";
import { useHistory, Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
      history.push("/notFound");
    }
    history.push("/principal");
    window.localStorage.setItem("auth", JSON.stringify(body.token));
    setAuth(body.token);
  };
  return (
    <div style={{ background: "lightgrey" }}>
      <div style={{ color: "red" }}>Iniciar sesión</div>
      <UserFormSignIn
        handlSubmit={handlSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      ></UserFormSignIn>
      <Link to="/signin">Registrarse</Link>
    </div>
  );
};

export { Login };
