import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { port } from "../principalPage/Principal";
import { UserFormChangePassword } from "../signin-login/UseForm";
import "../../css/style.css";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/changePassword`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ newPassword, passwordAgain }),
    });
  };
  return (
    <div className="changePassword">
      <div>Cambiar Contraseña</div>
      <UserFormChangePassword
        handlSubmit={handlSubmit}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        passwordAgain={passwordAgain}
        setPasswordAgain={setPasswordAgain}
      ></UserFormChangePassword>
      <Link to="/Login">Iniciar sesion</Link>
    </div>
  );
};

export { NewPassword };
