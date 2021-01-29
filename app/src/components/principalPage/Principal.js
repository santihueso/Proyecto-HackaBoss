import React, { useState, useEffect } from "react";
import { useFetchData } from "../useFetchData";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { HeadPrincipal } from "./HeadPrincipal";
import { Categories } from "./Categories";
import {
  BookOfKindCategory,
  ViewBook,
} from "../BookOfKindCategory/BookOfKindCategory";
import { LastBooks } from "./LastBooks";

const port = 8084;

const Principal = () => {
  return (
    <Router>
      <h1>Recy-book</h1>
      <Switch>
        <Route path="/principal/seeker/books/:type/:value">
          <div>
            <Link to="/principal">Principal</Link>
            <p>CACA</p>
          </div>
        </Route>
        <Route path="/beginning/category/:id">
          <ViewBook></ViewBook>
        </Route>
        <Route path="/category/:id">
          <BookOfKindCategory></BookOfKindCategory>
        </Route>
        <Route path="/principal">
          <HeadPrincipal></HeadPrincipal>
          <nav>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/newBook">Subir libro</Link>
          </nav>
          <Categories></Categories>
          <LastBooks></LastBooks>
        </Route>
      </Switch>
    </Router>
  );
};

export { Principal, port };
