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

const NewPassword = () => {
  const [NewPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [, navigate] = useLocation();

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   navigate("/login");
  // };
  return (
    <form onSubmit={handleChange}>
      <h1>Cambiar contraseña</h1>
      <input type="password" placeholder="Nueva contraseña" />
      <br />
      <input type="password" placeholder="Confirmar contraseña" />
      <br />
      <button>Cambiar contraseña</button>
    </form>
  );
};

export { NewPassword };
