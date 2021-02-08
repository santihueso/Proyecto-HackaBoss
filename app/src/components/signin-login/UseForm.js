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
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handlSubmit}>
      <UseLabelInput
        kind={"username"}
        id={"username"}
        name={"username"}
        value={username}
        setValue={setUsername}
      ></UseLabelInput>
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

const UserFormLogIn = ({
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

const UserFormChangePassword = ({
  handlSubmit,
  newPassword,
  setNewPassword,
  passwordAgain,
  setPasswordAgain,
}) => {
  return (
    <form onSubmit={handlSubmit}>
      <UseLabelInput
        kind={"password"}
        id={"newPassword"}
        name={"newPassword"}
        value={newPassword}
        setValue={setNewPassword}
      ></UseLabelInput>
      <UseLabelInput
        kind={"password"}
        id={"passwordAgain"}
        name={"passwordAgain"}
        value={passwordAgain}
        setValue={setPasswordAgain}
      ></UseLabelInput>
      <input type="submit" value="Cambiar Contraseña"></input>
    </form>
  );
};
export { UserFormSignIn, UseLabelInput, UserFormLogIn, UserFormChangePassword };
