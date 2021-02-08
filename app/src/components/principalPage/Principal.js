import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { HeadPrincipal } from "../headPrincipal/HeadPrincipal";
import { Categories } from "../categories/Categories";
import { BookOfKindCategory } from "../BookOfKindCategory/BookOfKindCategory";
import { LastBooks } from "../lastBooks/LastBooks";
import { FindForSeeker } from "../bookSeeker/FindForSeeker";
import { ProfileOutSide } from "../profile/ProfileOutSide";
import { ProfileUserInside } from "../profile/ProfileInside";
import { CreateProfile } from "../CreateProfile/CreateProfile";
import { SignIn } from "../signin-login/Signin";
import { Login } from "../signin-login/Login";
import { ListBooksUser } from "../profile/ListBooksUser";
import { NewPassword } from "../changePassword/changePassword";
import { NavPrincipal } from "../navPrincipal/NavPrincipal";
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
const port = 8084;

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
          <ViewBooksForCategories auth={auth}></ViewBooksForCategories>
        </Route>
        <Route path="/principal/category/:id/:name">
          <BookOfKindCategory></BookOfKindCategory>
        </Route>
        <Route path="/principal/profile/list/toSell/book/:idBook/edit">
          <FormEditBook auth={auth}></FormEditBook>
        </Route>
        <Route path="/principal/profile/list/favorites/book/:idBook">
          <ViewBooksForFavourites auth={auth}></ViewBooksForFavourites>
        </Route>
        <Route path="/principal/profile/list/purchase/book/:idBook">
          <ViewBooksForPurchase auth={auth}></ViewBooksForPurchase>
        </Route>
        <Route path="/principal/profile/list/reserved/book/:idBook">
          <ViewBooksForReserved auth={auth}></ViewBooksForReserved>
        </Route>
        <Route path="/principal/profile/list/toSell/book/:idBook">
          <ViewBooksForToSell auth={auth}></ViewBooksForToSell>
        </Route>
        <Route path="/principal/profile/list/offers/book/:idBook">
          <ViewBooksForOffers auth={auth}></ViewBooksForOffers>
        </Route>
        <Route path="/principal/profile/list/:kind">
          <ListBooksUser auth={auth}></ListBooksUser>
        </Route>
        <Route path="/principal/profile/edit">
          <CreateProfile auth={auth}></CreateProfile>
        </Route>
        <Route path="/principal/profile">
          <ProfileUserInside auth={auth}></ProfileUserInside>
        </Route>
        <Route path="/principal/newBook">
          <FormCreateBook auth={auth}></FormCreateBook>
        </Route>
        <Route path="/principal">
          <HeadPrincipal></HeadPrincipal>
          <NavPrincipal auth={auth}></NavPrincipal>
          <Categories></Categories>
          <LastBooks></LastBooks>
        </Route>
        <Route path="/signin">
          <SignIn></SignIn>
        </Route>
        <Route path="/login">
          <Login setAuth={setAuth}></Login>
        </Route>
        <Route path="/changePassword">
          <NewPassword></NewPassword>
        </Route>
        <Route path="/notFound">
          <p>No hay libros en esta categoría</p>
        </Route>
        <Route path="/yourBook">
          <p>El libro es tuyo</p>
        </Route>
        <Route path="/errorLogin">
          <p>Contraseña o email equivocado</p>
        </Route>
        <Route path="/">
          <Redirect to="/principal"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
};

export { Principal, port };
