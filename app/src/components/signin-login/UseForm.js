import React from "react";

const UseLabelInput = ({ kind, id, name, value, setValue }) => {
  return (
    <div>
      <label htmlFor={id}></label>
      <input
        id={id}
        type={kind}
        placeholder={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      ></input>
    </div>
  );
};

const UserFormSignIn = ({
  handlSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handlSubmit}>
      <UseLabelInput
        kind={"email"}
        id={"email"}
        name={"email"}
        value={email}
        setValue={setEmail}
      ></UseLabelInput>
      <UseLabelInput
        kind={"password"}
        id={"password"}
        name={"password"}
        value={password}
        setValue={setPassword}
      ></UseLabelInput>
      <input type="submit" value="submit"></input>
    </form>
  );
};

export { UserFormSignIn, UseLabelInput };
