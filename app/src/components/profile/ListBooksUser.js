import React, { useEffect, useState } from "react";
import { port } from "../principalPage/Principal";
import { useHistory, Link, useParams } from "react-router-dom";
import { useFetchAuth } from "../useFetch/useFetchAuth";
import { List } from "../principalPage/LastBooks";
const ListBooksUser = () => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const { kind } = useParams();
  const [data, setData] = useFetchAuth(
    `http://localhost:${port}/login/user/profile/${kind}`,
    auth
  );
  console.log(data);
  return <List array={data}></List>;
};

export { ListBooksUser };
