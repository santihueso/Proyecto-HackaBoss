import React, { useState } from "react";
import { UseLabelInput } from "../signin-login/UseForm";
import { port } from "../principalPage/Principal";
import { useHistory, Link } from "react-router-dom";
import { useFetchAuth } from "../useFetch/useFetchAuth";

const CreateProfile = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [dataUser, setDataUser] = useFetchAuth(
    `http://localhost:${port}/login/user/profile`,
    auth
  );
  const [value, setValue] = useState("");
  const history = useHistory();

  const change = (e) => {
    setValue(e.target);
  };
  const handlSubmit = async (e) => {
    e.preventDefault();

    const photo = e.target[0].files[0];
    const username = e.target[1].value;
    const descriptionUser = e.target[2].value;
    const city = e.target[3].value;
    const postalCode = e.target[4].value;
    const formData = new FormData();
    formData.append("photo", photo, photo.name);
    formData.append("username", username);
    formData.append("descriptionUser", descriptionUser);
    formData.append("city", city);
    formData.append("postalCode", postalCode);
    const res = await fetch(`http://localhost:${port}/user/editUser`, {
      method: "PUT",
      headers: {
        Authorization: auth,
      },
      body: formData,
    });
    if (res.status > 300) {
      console.warn("error", res);
    }
    history.push("/principal/profile");
  };

  return (
    <form onSubmit={handlSubmit} value={value} onChange={change}>
      <div>
        <label id="userImage"></label>
        <input id="userImage" type="file" accept="image/*"></input>
      </div>
      <UseLabelInput
        kind={"text"}
        id={"username"}
        name={"nombre"}
      ></UseLabelInput>
      <UseLabelInput
        kind={"text"}
        id={"description"}
        name={"descripción"}
      ></UseLabelInput>
      <UseLabelInput
        kind={"number"}
        id={"city"}
        name={"ciudad"}
      ></UseLabelInput>
      <UseLabelInput
        kind={"number"}
        id={"cp"}
        name={"codigo postal"}
      ></UseLabelInput>
      <input type="submit" value="submit"></input>
    </form>
  );
};

const ProfileUserInside = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [dataUser] = useFetchAuth(
    `http://localhost:${port}/login/user/profile`,
    auth
  );

  const showProfile = dataUser.map((e) => {
    const url = `http://localhost:${port}/uploads/${e.photo}`;
    return (
      <div key={e.id_user}>
        <nav>
          <Link to="/principal">Principal</Link>
          <Link to="/principal/profile/edit">Editar</Link>
        </nav>

        <img src={url} alt="avatar" style={{ maxWidth: 80 }}></img>
        <p>{e.username}</p>
        <p>{e.descriptionUser}</p>
        <p>{e.postalCode}</p>
        <nav>
          <Link to="/principal/profile/list/favorites">Favoritos</Link>
          <Link to="/principal/profile/list/offers">Notificaciones</Link>
          <Link to="/principal/profile/list/purchase">Comprados</Link>
          <Link to="/principal/profile/list/toSell">En venta</Link>
        </nav>
      </div>
    );
  });
  return showProfile;
};

export { CreateProfile, ProfileUserInside };
