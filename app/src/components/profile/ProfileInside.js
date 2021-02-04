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
  console.log(dataUser);
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [cp, setCp] = useState("");
  const history = useHistory();

  const handlSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", img, img.name);
    formData.append("username", name);
    formData.append("descriptionUser", description);
    formData.append("city", city);
    formData.append("postalCode", cp);
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
    <div>
      <form onSubmit={handlSubmit}>
        <div>
          <nav>
            <Link to="/principal">Principal ˃ </Link>
            <Link to="/principal/profile">Perfil</Link>
          </nav>
          <label id="userImage"></label>
          <input
            id="userImage"
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
            accept="image/*"
          ></input>
        </div>
        <UseLabelInput
          kind={"text"}
          id={"name"}
          name={"nombre"}
          value={name}
          setValue={setName}
        ></UseLabelInput>
        <UseLabelInput
          kind={"text"}
          id={"description"}
          name={"descripción"}
          value={description}
          setValue={setDescription}
        ></UseLabelInput>
        <UseLabelInput
          kind={"number"}
          id={"city"}
          name={"city"}
          value={city}
          setValue={setCity}
        ></UseLabelInput>
        <UseLabelInput
          kind={"numer"}
          id={"cp"}
          name={"codigo postal"}
          value={cp}
          setValue={setCp}
        ></UseLabelInput>
        <input type="submit" value="submit"></input>
      </form>
      <button onClick={() => history.push("/principal/profile")}>
        Cancelar
      </button>
    </div>
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
          <Link to="/principal">Principal ˃ </Link>
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
          <Link to="/principal/profile/list/reserved">Reservados</Link>
        </nav>
      </div>
    );
  });
  return showProfile;
};

export { ProfileUserInside, CreateProfile };
