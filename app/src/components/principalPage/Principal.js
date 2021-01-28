import React, { useState, useEffect } from "react";
import { useFetchData } from "../useFetchData";
import qs from "querystring";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const port = 8085;

const HeadPrincipal = () => {
  const [author, setInputValue] = useState("");
  const [seeker, setSeeker] = useState("");
  console.log(seeker, "s");
  const change = (e) => {
    const url = `http://localhost:${port}/beginning/seeker/${e.target.value}`;
    console.log(url);
    setSeeker(url);
  };

  const getData = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(author);
    console.log(seeker);
    // const form_data = new FormData();
    // form_data.append("author", author);

    const body = JSON.stringify({ author: author });
    //console.log("BO", body);

    const res = await fetch(seeker, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: body,
    });
    const books = await res.json();
    console.log(books);
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
        <input type="text" onChange={getData} value={author}></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

const Categories = () => {
  return (
    <section id="categories">
      <h2>Categorias</h2>
      <nav>
        <Link to="/category/1">Literatura española</Link>
        <Link to="/category/2">Idiomas</Link>
        <Link to="/category/3">Literatura extranjera</Link>
        <Link to="/category/4">Académicos</Link>
        <Link to="/category/5">Infantil</Link>
        <Link to="/category/6">Juvenil</Link>
        <Link to="/category/7">Comics/Manga</Link>
        <Link to="/category/8">Hobbies</Link>
      </nav>
    </section>
  );
};

const Avatar = ({ e }) => {
  const url = `http://localhost:${port}/uploads/${e.photoFront}`;
  const linkOfBook = `/beginning/category/${e.id_product}`;

  return (
    <Link to={linkOfBook}>
      <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>;
    </Link>
  );
};

const LastBooks = () => {
  const [data, setData] = useFetchData(
    `http://localhost:${port}/beginning/lastBooks`
  );
  const showBooks = [];
  let list;
  console.log(data);
  if (data.length > 8) {
    for (let i = 0; i < 8; i++) {
      showBooks.push(data[i]);
    }
    list = showBooks.map((e) => {
      return (
        <li id={e.id}>
          <p>{e.productName}</p>
          <Avatar e={e}></Avatar>
          <p>{e.price}</p>
        </li>
      );
    });
  } else {
    list = data.map((e) => {
      return (
        <li id={e.id}>
          <p>{e.productName}</p>
          <Avatar e={e}></Avatar>
          <p>{e.price}</p>
        </li>
      );
    });
  }

  return <ul>{list}</ul>;
};
const Principal = () => {
  return (
    <Router>
      <HeadPrincipal></HeadPrincipal>
      <h1>Recy-book</h1>
      <Categories></Categories>
      <LastBooks></LastBooks>
    </Router>
  );
};

export { Principal };
