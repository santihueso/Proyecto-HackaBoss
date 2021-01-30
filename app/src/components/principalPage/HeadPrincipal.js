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
  const [seeker, setSeeker] = useState("");
  const [key, setKey] = useState("");
  const getData = (e) => {
    setInputValue(e.target.value);
  };

  const change = (e) => {
    const url = `http://localhost:${port}/beginning/seeker/${e.target.value}`;
    const keyList = {
      category: "category_name",
      author: "author",
      title: "productname",
      cp: "postalCode",
    };
    const bodyPost = keyList[e.target.value];

    setKey(bodyPost);
    setSeeker(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataPost = {};
    dataPost[key] = inputValue;
    const res = await fetch(seeker, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    const books = await res.json();
    console.log(books);
    if (!books) {
      console.log("no hay");
    } else <Redirect to={`beginning/seeker/${e.target.value}`}></Redirect>;
  };
  return (
    <div>
      <select onChange={change}>
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
