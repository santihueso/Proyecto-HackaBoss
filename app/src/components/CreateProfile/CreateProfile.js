import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { useHistory, Link } from "react-router-dom";
import { useFetchAuth } from "../useFetch/useFetchAuth";

const CreateProfile = ({ auth }) => {
  const [dataUser] = useFetchAuth(
    `http://localhost:${port}/login/user/profile`,
    auth
  );
  let [img, setImg] = useState(null);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [city, setCity] = useState("");
  let [cp, setCp] = useState("");
  const [onImg, setOnImg] = useState(false);
  const [onName, setOnName] = useState(false);
  const [onDescription, setOnDescription] = useState(false);
  const [onCity, setOnCity] = useState(false);
  const [onCp, setOnCp] = useState(false);
  const history = useHistory();
  const newUser = dataUser.map((user) => {
    const handlSubmit = async (e) => {
      e.preventDefault();
      if (!name) {
        name = user.username;
      }
      if (!description) {
        description = user.descriptionUser;
      }
      if (!city) {
        city = user.city;
      }
      if (!cp) {
        cp = user.postalCode;
      }

      await saveUser({
        img,
        user,
        name,
        description,
        city,
        cp,
        auth,
      });
      history.push("/principal/profile");
    };

    return (
      <div key={user.id_user}>
        <form onSubmit={handlSubmit}>
          <div>
            <nav>
              <Link to="/principal">Principal ˃ </Link>
              <Link to="/principal/profile">Perfil</Link>
            </nav>
            <label htmlFor="userImage"></label>
            <input
              id="userImage"
              type="file"
              onChange={(e) => [setOnImg(true), setImg(e.target.files[0])]}
              accept="image/*"
            ></input>
          </div>
          <div>
            <label htmlFor="name"></label>
            <input
              id="name"
              value={onName ? name : user.username}
              type="text"
              placeholder="nombre"
              onChange={(e) => [setOnName(true), setName(e.target.value)]}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="description"></label>
            <input
              id="description"
              value={onDescription ? description : user.descriptionUser}
              type="text"
              placeholder="descripción"
              onChange={(e) => [
                setOnDescription(true),
                setDescription(e.target.value),
              ]}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="city"></label>
            <input
              id="city"
              value={onCity ? city : user.city}
              type="text"
              placeholder="ciudad"
              onChange={(e) => [setOnCity(true), setCity(e.target.value)]}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="cp"></label>
            <input
              id="cp"
              value={onCp ? cp : user.postalCode}
              type="number"
              placeholder="codigo postal"
              onChange={(e) => [setOnCp(true), setCp(e.target.value)]}
              required
            ></input>
          </div>

          <input type="submit" value="submit"></input>
        </form>
        <button onClick={() => history.push("/principal/profile")}>
          Cancelar
        </button>
      </div>
    );
  });
  return newUser;
};

async function saveUser({
  img = undefined,
  user,
  name,
  description,
  city,
  cp,
  auth,
}) {
  const formData = new FormData();
  if (img) {
    formData.append("photo", img, img.name);
  } else {
    formData.append("photo", user.photo);
  }
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
  return res.status === 200;
}

export { CreateProfile };
