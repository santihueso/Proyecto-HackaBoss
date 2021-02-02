import React, { useState } from "react";

const UseLabelInput = ({ kind, id, name }) => {
  return (
    <div>
      <label htmlFor={id}></label>
      <input id={id} type={kind} placeholder={name}></input>
    </div>
  );
};

const UserFormSignIn = ({ userData }) => {
  const [value, setValue] = useState("");
  const change = (e) => {
    setValue(e.target);
  };

  return (
    <form onSubmit={userData} value={value} onChange={change}>
      <UseLabelInput kind={"email"} id={"email"} name={"email"}></UseLabelInput>
      <UseLabelInput
        kind={"password"}
        id={"password"}
        name={"password"}
      ></UseLabelInput>
      <input type="submit" value="submit"></input>
    </form>
  );
};

export { UserFormSignIn, UseLabelInput };
