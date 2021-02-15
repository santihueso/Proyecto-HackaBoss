import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { BookOfKindCategory } from "./BookOfKindCategory";
import { FindForSeeker } from "./FindForSeeker";
import { ProfileOutSide } from "./ProfileOutSide";
import { ProfileUserInside } from "./ProfileInside";
import { CreateProfile } from "./CreateProfile";
import { ListBooksUser } from "./ListBooksUser";
import { ForgetPass, NewPassword } from "./changePassword";
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
import { ValorationsInside, ValorationsOutside } from "./Valorations";
import {
  ViewClose,
  ViewCorrectChangePass,
  ViewSendNewPass,
  Welcome,
} from "./Close-Welcome-ChangePass";

const port = 8084;

const Principal = () => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  return (
    <Router>
      <Switch>
        <Route path="/principal/category/book/:idBook/user/:idUser/valorations">
          <ValorationsOutside></ValorationsOutside>
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
        <Route path="/principal/profile/valorations">
          <ValorationsInside auth={auth}></ValorationsInside>
        </Route>
        <Route path="/principal/profile">
          <ProfileUserInside auth={auth}></ProfileUserInside>
        </Route>
        <Route path="/principal/newBook">
          <FormCreateBook auth={auth}></FormCreateBook>
        </Route>
        <Route path="/principal/forgetPass/valid">
          <ViewSendNewPass></ViewSendNewPass>
        </Route>
        <Route path="/principal/changePassword/valid">
          <ViewCorrectChangePass></ViewCorrectChangePass>
        </Route>

        <Route path="/principal/changePassword">
          <NewPassword auth={auth}></NewPassword>
        </Route>
        <Route path="/principal">
          <PrincipalPage auth={auth} setAuth={setAuth}></PrincipalPage>
        </Route>

        <Route path="/close">
          <ViewClose></ViewClose>
        </Route>
        <Route path="/welcome">
          <Welcome></Welcome>
        </Route>
        <Route path="/forgetPass">
          <ForgetPass></ForgetPass>
        </Route>
        <Route path="/">
          <Redirect to="/principal"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
};

export { Principal, port };
