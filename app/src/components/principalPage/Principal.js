import React, { useState, useEffect } from "react";
import { useFetchData } from "../useFetch/useFetchData";
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
import { SignIn } from "../signin-login/Signin";
import { Login } from "../signin-login/Login";
const port = 8084;

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
        <Route path="/signin">
          <SignIn></SignIn>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/notFound">
          <p>No hay libros en esta categoría</p>
        </Route>
      </Switch>
    </Router>
  );
};

export { Principal, port };
