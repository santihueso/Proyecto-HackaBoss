import React, { useState } from "react";
import { port } from "./Principal";
import { UserFormSignIn } from "./UseForm";
import { useHistory } from "react-router-dom";
import "../css/login-signin.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(false);
  const hiddenView = hidden ? { display: "none" } : { display: "block" };
  const history = useHistory();
  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.status !== 200) {
      const body = await res.json();
      console.warn(res.status);
      setError(body.error);
      setHidden(false);
    } else {
      return history.push("/welcome");
    }
  };

  return (
    <section className="wrapper" style={hiddenView}>
      <section className="register" style={hiddenView}>
        <button onClick={() => setHidden(true)}>x</button>
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
      </section>
    </section>
  );
};

export { SignIn };
