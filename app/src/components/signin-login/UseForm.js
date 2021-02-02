import e from "cors";
import React, { useState } from "react";
import { port } from "../principalPage/Principal";

const UserFormSignIn = ({ userData }) => {
  const [value, setValue] = useState("");
  const change = (e) => {
    setValue(e.target);
  };

  return (
    <form onSubmit={userData} value={value} onChange={change}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email"></input>
      <label htmlFor="password">Password</label>
      <input id="password" type="password"></input>
      <input type="submit" value="submit"></input>
    </form>
  );
};

export { UserFormSignIn };
