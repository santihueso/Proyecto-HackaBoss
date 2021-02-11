import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { BookOfKindCategory } from "./BookOfKindCategory";

import { FindForSeeker } from "./FindForSeeker";
import { ProfileOutSide } from "./ProfileOutSide";
import { ProfileUserInside } from "./ProfileInside";
import { CreateProfile } from "./CreateProfile";
import { SignIn } from "./Signin";
import { ListBooksUser } from "./ListBooksUser";
import { NewPassword } from "./changePassword";
import { PrincipalPage } from "./PrincipalPage";
import {
  ViewBooksForFavourites,
  ViewBooksForPurchase,
  ViewBooksForReserved,
  ViewBooksForToSell,
  ViewBooksForOffers,
  ViewBooksForCategories,
} from "./ViewBooksFor";
import { FormEditBook } from "./FormBook";
import { FormCreateBook } from "./FormCreatebook";
import { SoldBooks } from "./Valorations";

const port = 8084;

const Principal = () => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  return (
    <Router>
      <Switch>
        <Route path="/principal/category/book/:idBook/user/:idUser/valorations">
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
        <Route path="/principal/changePassword/valid">
          <Link to="/principal">Principal</Link>
          <Link to="/principal/profile">Perfil</Link>
          <p>Se ha cambiado correctamente</p>
        </Route>

        <Route path="/principal/changePassword">
          <NewPassword auth={auth}></NewPassword>
        </Route>
        <Route path="/principal">
          <PrincipalPage auth={auth} setAuth={setAuth}></PrincipalPage>
        </Route>
        <Route path="/signin">
          <SignIn></SignIn>
        </Route>

        <Route path="/">
          <Redirect to="/principal"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
};

export { Principal, port };
