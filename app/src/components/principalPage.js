import React, { useState, useEffect } from "react";

// const useFetchData = (url) => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((res) => setData(res, (msg) => console.log("Err:", msg)));
//   }, []);
//   return [data, setData];
// }



const Principal = async () => {
  const [data, setData] = useState('')
  const res = await fetch("http://cors-bridge.herokuapp.com/http://localhost:8084/api/user")
      .then((res) => res.json())
      .then((res) => setData(res, (msg) => console.log("Err:", msg)));
 

  return (
    <div>
      <h1>Recy-book</h1>
      <p>{res}</p>
    </div>
  );
};

export { Principal };
