import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

const FormValoration = () => {
  // const history = useHistory();
  const [text, setText] = useState("");
  const [star, setStar] = useState(0);
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  if (auth === "") {
    return <Redirect to="/login"></Redirect>;
  }
  console.log(star);
  return (
    <form>
      <div>
        <label htmlFor="radio1">★</label>
        <input
          id="radio1"
          type="radio"
          name="estrellas"
          value={star}
          onChange={() => setStar(1)}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio2">★</label>
        <input
          id="radio2"
          type="radio"
          name="estrellas"
          value={star}
          onChange={() => setStar(2)}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio3">★</label>
        <input
          id="radio3"
          type="radio"
          name="estrellas"
          value={star}
          onChange={() => setStar(3)}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio4">★</label>
        <input
          id="radio4"
          type="radio"
          name="estrellas"
          value={star}
          onChange={() => setStar(4)}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio5">★</label>
        <input
          id="radio5"
          type="radio"
          name="estrellas"
          value={star}
          onChange={() => setStar(5)}
          style={{ display: "none" }}
        ></input>
        <button onClick={() => setStar(0)}>Borrar</button>
      </div>
      <textarea
        id="opinion"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe aquí"
      ></textarea>
      <input type="submit"></input>
    </form>
  );
};

export { FormValoration };
