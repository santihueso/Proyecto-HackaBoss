import React, { useState, useEffect } from "react";
import { useFetchData } from "../useFetchData";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import { HeadPrincipal } from "./HeadPrincipal";
import { Categories } from "./Categories";
import {
  BookOfKindCategory,
  ViewBook,
} from "../BookOfKindCategory/BookOfKindCategory";
import { LastBooks } from "./LastBooks";
import { FindForSeeker } from "../bookSeeker/FindForSeeker";
import { Profile } from "../profile/Profile";
const port = 8085;

const Principal = () => {
  return (
    <Router>
      <h1>Recy-book</h1>
      <Switch>
        <Route path="/principal/category/:id/:name/book/:idBook/user/:idUser">
          <p>CACATUA</p>

          <Profile></Profile>
        </Route>
        <Route path="/books/:seek/:data">
          <p>CACA</p>
          <FindForSeeker></FindForSeeker>
        </Route>
        <Route path="/principal/category/:id/:name/book/:idBook">
          <ViewBook></ViewBook>
        </Route>
        <Route path="/principal/category/:id/:name">
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
        <Route path="/newBook">
          <Redirect to="/otra"></Redirect>
        </Route>
        {/* <Route path="/books">
          <FindForSeeker books={this.books.location.state.data}></FindForSeeker>
        </Route> */}
        <Route path="/otra">
          <p>HOla OTRA</p>
        </Route>
        <Route path="/notFound">
          <p>No hay libros en esta categoría</p>
        </Route>
      </Switch>
    </Router>
  );
};

export { Principal, port };
