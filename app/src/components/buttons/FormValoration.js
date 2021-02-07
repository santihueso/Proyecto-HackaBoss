import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { Redirect, useHistory } from "react-router-dom";

const FormValoration = ({ idBook }) => {
  const history = useHistory();

  const [text, setText] = useState("");
  const [star, setStar] = useState(0);
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  if (auth === "") {
    return <Redirect to="/login"></Redirect>;
  }
  const handlSubmit = async () => {
    const res = await fetch(
      `http://localhost:${port}/login/user/:userId/book/${idBook}/assessment`,
      {
        method: "PUT",
        headers: { "content-type": "application/json", Authorization: auth },
        body: JSON.stringify({ assessment: star, opinion: text }),
      }
    );
    if (res.status > 300) {
      console.warn("error", res);
    }
    history.push(`/principal/profile/list/purchase`);
  };
  const starComparator = (value) => () =>
    star === value ? setStar(0) : setStar(value);
  console.log(star);
  return (
    <form onSubmit={handlSubmit}>
      <div>
        <label htmlFor="radio1">★</label>
        <input
          id="radio1"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={() => setStar(1)}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio2">★</label>
        <input
          id="radio2"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={starComparator(2)}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio3">★</label>
        <input
          id="radio3"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={() => (star === 3 ? setStar(0) : setStar(3))}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio4">★</label>
        <input
          id="radio4"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={() => setStar(4)}
          style={{ display: "none" }}
        ></input>
        <label htmlFor="radio5">★</label>
        <input
          id="radio5"
          type="checkbox"
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
