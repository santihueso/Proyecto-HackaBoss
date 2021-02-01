import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { port } from "./Principal";
import { List } from "./LastBooks";
import { Redirect } from "react-router-dom";

const HeadPrincipal = () => {
  const [inputValue, setInputValue] = useState("");
  const [key, setKey] = useState("category");

  const getData = (e) => {
    setInputValue(e.target.value);
  };

  const change = (e) => {
    setKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `http://localhost:3000/books/${key}/${inputValue}`;
  };

  return (
    <div>
      <select onChange={change} value={key}>
        <option id="category " value="category">
          Categoria
        </option>
        <option id="author " value="author">
          Autor
        </option>
        <option id="cp " value="cp">
          CP
        </option>
        <option id="name " value="title">
          Título
        </option>
      </select>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={getData} value={inputValue}></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export { HeadPrincipal };
