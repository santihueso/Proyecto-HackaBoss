import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/headPrincipal.css";
const HeadPrincipal = () => {
  const [inputValue, setInputValue] = useState("");
  const [key, setKey] = useState("title");
  const history = useHistory();
  const getData = (e) => {
    setInputValue(e.target.value);
  };

  const change = (e) => {
    setKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/books/${key}/${inputValue}`);
  };

  return (
    <div className="seeker">
      <select className="select" onChange={change} value={key}>
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
          onChange={getData}
          value={inputValue}
          placeholder="camus"
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export { HeadPrincipal };
