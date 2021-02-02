import React from "react";
import { port } from "../principalPage/Principal";
import { UserFormSignIn } from "./UseForm";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();
  const userData = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch(`http://localhost:${port}/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(res.status);
    history.push("/login");
  };
  return (
    <div style={{ background: "lightgrey" }}>
      <div style={{ color: "red" }}>Register</div>
      <UserFormSignIn userData={userData} />
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};

export { SignIn };
