import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { port } from "./Principal";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import { ButtonDelete } from "./Buttons";

const Notifications = ({ auth }) => {
  const { idBook } = useParams();
  const history = useHistory();
  const [data] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/offers/${idBook}`,
    auth
  );
  if (!auth) {
    return history.push("/principal");
  }

  const fav = data ? data[0] : null;
  const list = fav ? fav[0].count : null;
  const reservedPurchase = data ? data[1] : null;
  const array = reservedPurchase ? reservedPurchase.length : null;
  const date = new Date();

  const listAll =
    array > 0 ? (
      reservedPurchase.map((e) => {
        const reserveDate = new Date(e.reserveDate);
        const rest = date.getTime() - reserveDate.getTime();
        const hours = Math.round(rest / (1000 * 60 * 60 * 24));
        console.log(hours);
        return (
          <section key={e.product}>
            {e.purchase !== 1 ? <p>En venta</p> : <p>Comprado</p>}
            {e.reservation !== 1 && e.purchase !== 1 ? (
              <p>Disponible para reservar</p>
            ) : null}
            {e.reservation === 1 ? (
              <div>
                <p>Reservado</p>
                {hours >= 24 ? (
                  <ButtonDelete
                    idBook={idBook}
                    to={"seller"}
                    rout={"offers"}
                    auth={auth}
                  ></ButtonDelete>
                ) : null}
              </div>
            ) : null}
            {e.opinion !== "" ? null : e.opinion}
            {e.assessment !== "number" ? null : e.assessment}
            <p>Favoritos: {list}</p>
          </section>
        );
      })
    ) : (
      <section>
        <p>En venta</p>
        <p>Disponible para reservar</p>
        <p>Favoritos: {list}</p>
      </section>
    );

  return listAll;
};

export { Notifications };
