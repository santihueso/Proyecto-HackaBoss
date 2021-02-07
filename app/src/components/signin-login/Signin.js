import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { UserFormSignIn } from "./UseForm";
import { Link, useHistory } from "react-router-dom";
import "../../css/style.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    console.log(res.status);
    history.push("/login");
  };
  return (
    <div className="register">
      <div>Register</div>
      <UserFormSignIn
        handlSubmit={handlSubmit}
        username={username}
        setUsername={setUsername}
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
