import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { port } from "./Principal";
import { useFetchAuth } from "./useFetch/useFetchAuth";
import { ButtonDelete } from "./Buttons";

const Notifications = ({ auth }) => {
  const { idBook } = useParams();
  const history = useHistory();
  const [dateTime, setDateTime] = useState(new Date());
  const [data] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/offers/${idBook}`,
    auth
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (!auth) {
    return history.push("/principal");
  }

  const fav = data ? data[0] : null;
  const list = fav ? fav[0].count : null;
  const reservedPurchase = data ? data[1] : null;
  const array = reservedPurchase ? reservedPurchase.length : null;

  const listAll =
    array > 0 ? (
      reservedPurchase.map((e) => {
        const reserveDate = new Date(e.reserveDate);
        const rest = dateTime.getTime() - reserveDate.getTime();
        const hours = rest / 3600000;

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
                ) : (
                  <p>Podrá borrar la reserva en 24h</p>
                )}
              </div>
            ) : null}
            {e.opinion !== "" ? null : e.opinion}
            {e.assessment !== "number" ? null : e.assessment}
            {e.purchase !== 1 ? <p>Favoritos: {list}</p> : null}
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
