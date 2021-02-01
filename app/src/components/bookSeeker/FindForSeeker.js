import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import { List } from "../principalPage/LastBooks";
import { port } from "../principalPage/Principal";

const FindForSeeker = () => {
  const { seek, data } = useParams();
  const [list, setList] = useState([]);
  const url = `http://localhost:${port}/beginning/seeker/${seek}`;

  useEffect(() => {
    const dataPost = {};
    dataPost[seek] = data;
    const fetcher = async () => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
      if (res.status !== 200) {
        console.warn("error", res);
      }
      const body = await res.json();
      setList(body);
    };
    fetcher();

    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(dataPost),
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       return res.json();
    //     } else {
    //       console.warn("problema!!!", res);
    //       return res.json();
    //     }
    //   })
    //   .then((body) => setList(body));
  }, []);
  if (list.error) {
    return <Redirect to="/notFound"></Redirect>;
  }
  return (
    <div>
      <List array={list}></List>
    </div>
  );
};

export { FindForSeeker };
