import React, { useEffect, useState } from "react";
import { UseLabelInput } from "../signin-login/UseForm";
import { useFetchPostData } from "../useFetch/useFetchPostData";
import { port } from "../principalPage/Principal";

const CreateProfile = () => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  const [value, setValue] = useState("");

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

export { CreateProfile };
