import React from "react";

import { HeadPrincipal } from "./HeadPrincipal";
import { Categories } from "./Categories";
import { LastBooks } from "./LastBooks";
import { NavPrincipal } from "./NavPrincipal";
import "../css/navPrincipal.css";

const PrincipalPage = ({ auth, setAuth }) => {
  return (
    <section className="principal">
      <HeadPrincipal></HeadPrincipal>
      <NavPrincipal auth={auth} setAuth={setAuth}></NavPrincipal>
      <Categories></Categories>
      <LastBooks></LastBooks>
    </section>
  );
};

export { PrincipalPage };
