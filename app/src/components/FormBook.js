import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { port } from "./Principal";
import { useFetchData } from "./useFetch/useFetchData";
import "../css/formBook.css";

const FormEditBook = ({ auth }) => {
  const { idBook } = useParams();
  const [book] = useFetchData(
    `http://localhost:${port}/beginning/category/${idBook}`
  );

  let [imgOne, setImgOne] = useState(null);
  let [imgTwo, setImgTwo] = useState(null);
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [price, setPrice] = useState(0);
  let [language, setLanguage] = useState("");

  const [, setOnImgOne] = useState(false);
  const [, setOnImgTwo] = useState(false);
  const [onTitle, setOnTitle] = useState(false);
  const [onAuthor, setOnAuthor] = useState(false);
  const [onDescription, setOnDescription] = useState(false);
  const [onCategory, setOnCategory] = useState(false);
  const [onPrice, setOnPrice] = useState(false);
  const [onLanguage, setOnLanguage] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();
  const edit = book.map((e) => {
    const handlSubmit = async (event) => {
      event.preventDefault();

      if (!title) {
        title = e.productName;
      }
      if (!author) {
        author = e.author;
      }
      if (!description) {
        description = e.descriptionProduct;
      }
      if (!category) {
        category = e.category;
      }
      if (!price) {
        price = e.price;
      }
      if (!language) {
        language = e.bookLanguage;
      }
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
        idBook,
        e,
      });
      console.log(res);
      if (!res) {
        setError("EL precio debe ser superior a cero");
      } else {
        history.push(`/principal/profile/list/toSell/book/${idBook}`);
      }
    };

    return (
      <section key={e.id_product} className="forms">
        <div className="formBook">
          <p>Editar libro</p>
          <form onSubmit={handlSubmit}>
            <div>
              <label htmlFor="imgOne"></label>
              <input
                id="imgOne"
                type="file"
                onChange={(element) => [
                  setOnImgOne(true),
                  setImgOne(element.target.files[0]),
                ]}
                accept="image/*"
                style={{ color: "transparent" }}
              ></input>
            </div>
            <div>
              <label htmlFor="imgTwo"></label>
              <input
                id="imgTwo"
                type="file"
                onChange={(element) => [
                  setOnImgTwo(true),
                  setImgTwo(element.target.files[0]),
                ]}
                accept="image/*"
                style={{ color: "transparent" }}
              ></input>
            </div>

            <div>
              <label htmlFor="title"></label>
              <input
                id="title"
                value={onTitle ? title : e.productName}
                type="text"
                placeholder="titulo"
                onChange={(element) => [
                  setOnTitle(true),
                  setTitle(element.target.value),
                ]}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="author"></label>
              <input
                id="author"
                value={onAuthor ? author : e.author}
                type="text"
                placeholder="titulo"
                onChange={(element) => [
                  setOnAuthor(true),
                  setAuthor(element.target.value),
                ]}
                maxLength="20"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="description"></label>
              <input
                id="description"
                value={onDescription ? description : e.descriptionProduct}
                type="text"
                placeholder="descripción"
                onChange={(element) => [
                  setOnDescription(true),
                  setDescription(element.target.value),
                ]}
                maxLength="60"
                required
              ></input>
            </div>

            <div>
              <label htmlFor="price"></label>
              <input
                id="price"
                value={onPrice ? price : e.price}
                type="number"
                placeholder="precio"
                onChange={(element) => [
                  setOnPrice(true),
                  setPrice(element.target.value),
                ]}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="language"></label>
              <input
                id="language"
                value={onLanguage ? language : e.bookLanguage}
                type="text"
                placeholder="idioma"
                onChange={(element) => [
                  setOnLanguage(true),
                  setLanguage(element.target.value),
                ]}
                required
              ></input>
            </div>
            <div>
              <SelectCategories
                id={onCategory ? category : e.category}
                setId={setCategory}
                on={onCategory}
                setOn={setOnCategory}
              ></SelectCategories>
            </div>
            <div style={{ color: "red", minHeight: "1.5em" }}>{error} </div>
            <input type="submit" value="Guardar"></input>
          </form>
          <button onClick={() => history.push("/principal")}>x</button>
        </div>
      </section>
    );
  });
  return edit;
};

const SelectCategories = ({ id, setId, setOn, on }) => {
  const [data] = useFetchData(`http://localhost:${port}/beginning/categories`);

  const listCategories = data.map((e) => {
    return (
      <option key={e.id_category} value={e.id_category}>
        {e.category_name}
      </option>
    );
  });
  return (
    <select
      onChange={(e) => [setOn(true), setId(e.target.value)]}
      value={id}
      required
    >
      {listCategories}
    </select>
  );
};

async function saveBook({
  imgOne = undefined,
  imgTwo = undefined,
  title,
  author,
  description,
  category,
  price,
  language,
  auth,
  idBook,
  e,
}) {
  const formData = new FormData();

  if (imgOne) {
    formData.append("change", imgOne, imgOne.name);
  } else {
    formData.append("change", e.photoFront);
  }
  if (imgTwo) {
    formData.append("change", imgTwo, imgTwo.name);
  } else {
    formData.append("change", e.photoBack);
  }

  formData.append("productName", title);
  formData.append("author", author);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("bookLanguage", language);
  formData.append("descriptionProduct", description);

  const res = await fetch(
    `http://localhost:${port}/login/user/book/${idBook}/editBook`,
    {
      method: "PUT",
      headers: {
        Authorization: auth,
      },
      body: formData,
    }
  );
  if (res.status > 300) {
    console.warn("error", res);
  }
  return res.status === 200;
}

export { FormEditBook };
