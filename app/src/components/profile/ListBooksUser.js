import React, { useState } from "react";
import { port } from "../principalPage/Principal";
import { Link, useParams } from "react-router-dom";
import { useFetchAuth } from "../useFetch/useFetchAuth";
import { List } from "../principalPage/LastBooks";

const ListBooksUser = () => {
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const { kind } = useParams();
  const [dataList] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/${kind}`,
    auth
  );

  return (
    <div>
      <nav>
        <Link to="/principal">Principal</Link>
        <Link to="/principal/profile">Profile</Link>
      </nav>
      <List array={dataList}></List>
    </div>
  );
};

export { ListBooksUser };
