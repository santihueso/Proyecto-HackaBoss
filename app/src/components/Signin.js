import React, { useState } from "react";
import { port } from "./Principal";
import { UserFormSignIn } from "./UseForm";
import { Link, useHistory } from "react-router-dom";
import "../css/login-signin.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const body = await res.json();
    if (res.status !== 200) {
      console.warn(res.status);
      setError(body.error);
    } else {
      return history.push("/login");
    }
  };
  return (
    <div className="register">
      <p>Register</p>
      <UserFormSignIn
        handlSubmit={handlSubmit}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        err={error}
      ></UserFormSignIn>
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};

export { SignIn };
