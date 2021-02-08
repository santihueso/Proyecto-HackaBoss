import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { Link, useParams } from "react-router-dom";
import { useFetchAuth } from "../useFetch/useFetchAuth";
import { List } from "../principalPage/List-Avatar";

const ListBooksUser = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const { kind } = useParams();
  const [dataList] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/${kind}`,
    auth
  );
  const linkOfListBookUser = (productId) =>
    `/principal/profile/list/${kind}/book/${productId}`;

  return (
    <div>
      <nav>
        <Link to="/principal">Principal ˃ </Link>
        <Link to="/principal/profile">Profile</Link>
      </nav>
      <List array={dataList} link={linkOfListBookUser} kind={kind}></List>
    </div>
  );
};

export { ListBooksUser };
