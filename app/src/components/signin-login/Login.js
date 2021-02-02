import React from "react";
import { port } from "../principalPage/Principal";
import { UserFormSignIn } from "./UseForm";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const userData = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

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
  };
  return (
    <div style={{ background: "lightgrey" }}>
      <div style={{ color: "red" }}>Iniciar sesión</div>
      <UserFormSignIn userData={userData} />
      <Link to="/signin">Registrarse</Link>
    </div>
  );
};

export { Login };
