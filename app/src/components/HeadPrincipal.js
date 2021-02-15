import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/headPrincipal.css";

const HeadPrincipal = () => {
  const [inputValue, setInputValue] = useState("");
  const [key, setKey] = useState("title");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/books/${key}/${inputValue}`);
  };

  return (
    <header className="headerPrincipal">
      <h1>RecyBook</h1>
      <section className="seeker">
        <select
          className="select"
          onChange={(e) => setKey(e.target.value)}
          value={key}
        >
          <option className="option" id="city " value="city">
            Ciudad
          </option>
          <option className="option" id="author " value="author">
            Autor
          </option>
          <option className="option" id="cp " value="cp">
            CP
          </option>
          <option className="option" id="name " value="title">
            Título
          </option>
        </select>
        <form className="textSeek" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="Escribe aquí"
          ></input>
          <input type="submit"></input>
        </form>
      </section>
    </header>
  );
};

export { HeadPrincipal };
