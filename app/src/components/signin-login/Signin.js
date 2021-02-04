import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { UserFormSignIn } from "./UseForm";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const handlSubmit = async (e) => {
    e.preventDefault();

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
      <UserFormSignIn
        handlSubmit={handlSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      ></UserFormSignIn>
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};

export { SignIn };
