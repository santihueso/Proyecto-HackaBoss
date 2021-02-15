import React, { useState } from "react";
import { port } from "./Principal";
import { useHistory } from "react-router-dom";
import "../css/formValoration.css";

const FormValoration = ({ idBook, auth }) => {
  const history = useHistory();
  const [text, setText] = useState("");
  const [star, setStar] = useState(0);

  const handlSubmit = async () => {
    if (!auth) {
      history.push("/principal");
    }
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
  const color = star === 0 ? { color: "gray" } : { color: "orange" };

  return (
    <form onSubmit={handlSubmit} className="valoration">
      <p className="classification">
        <input
          id="radio1"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={starComparator(5)}
          style={color}
        ></input>
        <label htmlFor="radio1">★</label>

        <input
          id="radio2"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={starComparator(4)}
          style={color}
        ></input>
        <label htmlFor="radio2">★</label>

        <input
          id="radio3"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={starComparator(3)}
          style={color}
        ></input>
        <label htmlFor="radio3">★</label>

        <input
          id="radio4"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={starComparator(2)}
          style={color}
        ></input>
        <label htmlFor="radio4">★</label>

        <input
          id="radio5"
          type="checkbox"
          name="estrellas"
          value={star}
          onChange={starComparator(1)}
          style={color}
        ></input>
        <label htmlFor="radio5">★</label>
      </p>
      <div>
        <textarea
          id="opinion"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe aquí"
          required
        ></textarea>
      </div>
      <input className="btnViewBook" type="submit" value="Enviar"></input>
    </form>
  );
};

export { FormValoration };
