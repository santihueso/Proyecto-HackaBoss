import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HeadPrincipal } from "./HeadPrincipal";
import { Categories } from "./Categories";
import { BookOfKindCategory } from "../BookOfKindCategory/BookOfKindCategory";
import { LastBooks } from "./LastBooks";
import { FindForSeeker } from "../bookSeeker/FindForSeeker";
import { ProfileOutSide } from "../profile/ProfileOutSide";
import { ProfileUserInside, CreateProfile } from "../profile/ProfileInside";
import { SignIn } from "../signin-login/Signin";
import { Login } from "../signin-login/Login";
import { ListBooksUser } from "../profile/ListBooksUser";
import {
  ViewBooksForFavourites,
  ViewBooksForPurchase,
  ViewBooksForReserved,
  ViewBooksForToSell,
  ViewBooksForOffers,
  ViewBooksForCategories,
} from "../buttons/ViewBooksFor";
import { FormEditBook } from "../FormBook/FormBook";
import { FormCreateBook } from "../FormBook/FormCreatebook";
import { SoldBooks } from "../profile/Valorations";

const port = 8085;

const Principal = () => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  return (
    <Router>
      <h1>Recy-book</h1>
      <Switch>
        <Route path="/principal/category/:id/:name/book/:idBook/user/:idUser/valorations">
          <SoldBooks></SoldBooks>
        </Route>
        <Route path="/principal/category/:id/:name/book/:idBook/user/:idUser">
          <ProfileOutSide></ProfileOutSide>
        </Route>

        <Route path="/books/:seek/:data">
          <FindForSeeker></FindForSeeker>
        </Route>

        <Route path="/principal/category/:id/:name/book/:idBook">
          <ViewBooksForCategories></ViewBooksForCategories>
        </Route>
        <Route path="/principal/category/:id/:name">
          <BookOfKindCategory></BookOfKindCategory>
        </Route>
        <Route path="/principal/profile/list/toSell/book/:idBook/edit">
          <FormEditBook></FormEditBook>
        </Route>
        <Route path="/principal/profile/list/favorites/book/:idBook">
          <ViewBooksForFavourites></ViewBooksForFavourites>
        </Route>
        <Route path="/principal/profile/list/purchase/book/:idBook">
          <ViewBooksForPurchase></ViewBooksForPurchase>
        </Route>
        <Route path="/principal/profile/list/reserved/book/:idBook">
          <ViewBooksForReserved></ViewBooksForReserved>
        </Route>
        <Route path="/principal/profile/list/toSell/book/:idBook">
          <ViewBooksForToSell></ViewBooksForToSell>
        </Route>
        <Route path="/principal/profile/list/offers/book/:idBook">
          <ViewBooksForOffers></ViewBooksForOffers>
        </Route>
        <Route path="/principal/profile/list/:kind">
          <ListBooksUser></ListBooksUser>
        </Route>
        <Route path="/principal/profile/edit">
          <CreateProfile></CreateProfile>
        </Route>
        <Route path="/principal/profile">
          <ProfileUserInside></ProfileUserInside>
        </Route>
        <Route path="/principal/newBook">
          <FormCreateBook></FormCreateBook>
        </Route>
        <Route path="/principal">
          <HeadPrincipal></HeadPrincipal>
          <nav>
            {auth !== "" ? (
              <Link to="/principal/profile">Perfil</Link>
            ) : (
              <Link to="/login">Iniciar sesión</Link>
            )}

            <Link to="/principal/newBook">Subir libro</Link>
          </nav>
          <Categories></Categories>
          <LastBooks></LastBooks>
        </Route>
        <Route path="/signin">
          <SignIn></SignIn>
        </Route>
        <Route path="/login">
          <Login setAuth={setAuth}></Login>
        </Route>
        <Route path="/notFound">
          <p>No hay libros en esta categoría</p>
        </Route>
      </Switch>
    </Router>
  );
};

export { Principal, port };
