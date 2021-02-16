import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { port } from "./Principal";
import { useFetchData } from "./useFetch/useFetchData";

const FormCreateBook = ({ auth }) => {
  const history = useHistory();

  if (!auth) {
    history.push("/principal");
  }
  const [imgOne, setImgOne] = useState(null);
  const [imgTwo, setImgTwo] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(2);
  const [price, setPrice] = useState(0);
  const [language, setLanguage] = useState("");
  const [error, setError] = useState("");
  const handlSubmit = async (event) => {
    event.preventDefault();
    const res = await saveBook({
      imgOne,
      imgTwo,
      title,
      author,
      description,
      category,
      price,
      language,
      auth,
    });
    if (res.err) {
      setError("El precio debe ser superior a cero");
    } else {
      history.push(`/principal/profile/list/toSell`);
    }
  };

  return (
    <section className="forms">
      <div className="formBook">
        <p>Subir un libro</p>
        <form onSubmit={handlSubmit}>
          <div>
            <label htmlFor="imgOne"></label>
            <input
              id="imgOne"
              type="file"
              onChange={(element) => setImgOne(element.target.files[0])}
              accept="image/*"
              style={{ color: "transparent" }}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="imgTwo"></label>
            <input
              id="imgTwo"
              type="file"
              onChange={(element) => setImgTwo(element.target.files[0])}
              accept="image/*"
              style={{ color: "transparent" }}
              required
            ></input>
          </div>

          <div>
            <label htmlFor="title"></label>
            <input
              id="title"
              value={title}
              type="text"
              placeholder="titulo"
              onChange={(element) => setTitle(element.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="author"></label>
            <input
              id="author"
              value={author}
              type="text"
              placeholder="autor"
              onChange={(element) => setAuthor(element.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="description"></label>
            <input
              id="description"
              value={description}
              type="text"
              placeholder="descripción"
              onChange={(element) => setDescription(element.target.value)}
              required
              maxLength="60"
            ></input>
          </div>

          <div>
            <label htmlFor="price"></label>
            <input
              id="price"
              value={price}
              type="number"
              placeholder="precio"
              onChange={(element) => setPrice(element.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="language"></label>
            <input
              id="language"
              value={language}
              type="text"
              placeholder="idioma"
              onChange={(element) => setLanguage(element.target.value)}
              required
            ></input>
          </div>
          <div>
            <SelectCategories
              id={category}
              setId={setCategory}
            ></SelectCategories>
          </div>
          <div style={{ color: "red", minHeight: "1.5em" }}>{error} </div>
          <input type="submit" value="Enviar"></input>
        </form>
        <button onClick={() => history.push("/principal")}>x</button>
      </div>
    </section>
  );
};

const SelectCategories = ({ id, setId }) => {
  const [data] = useFetchData(`http://localhost:${port}/beginning/categories`);

  const listCategories = data.map((e) => {
    return (
      <option key={e.id_category} value={e.id_category}>
        {e.category_name}
      </option>
    );
  });
  return (
    <select onChange={(e) => setId(e.target.value)} value={id} required>
      {listCategories}
    </select>
  );
};

async function saveBook({
  imgOne,
  imgTwo,
  title,
  author,
  description,
  category,
  price,
  language,
  auth,
}) {
  const formData = new FormData();

  formData.append("photos", imgOne, imgOne.name);
  formData.append("photos", imgTwo, imgTwo.name);
  formData.append("productName", title);
  formData.append("author", author);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("bookLanguage", language);
  formData.append("descriptionProduct", description);

  const res = await fetch(`http://localhost:${port}/login/user/newBook`, {
    method: "POST",
    headers: {
      Authorization: auth,
    },
    body: formData,
  });

  if (res.status !== 200) {
    const body = res.json();
    console.warn("error", res);
    return body;
  }
  return res.status === 200;
}

export { FormCreateBook };
