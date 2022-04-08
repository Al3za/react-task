import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthorUserCreate from "./hemskärmen/AuthorUserCreate";
import HomePage from "./hemskärmen/HomePage";
import IdDataPage from "./hemskärmen/IdDataPage";
import LoginPage from "./hemskärmen/LoginPage";
import UselocationPage from "./hemskärmen/UselocationTestPage";

const context = createContext({});

function App() {
  const [data, setData] = useState([]);
  const [myData, setMyData] = useState({});
  const URL = `https://frebi.willandskill.eu/api/v1/customers/`;
  const MeURL = `https://frebi.willandskill.eu/api/v1/me`;

  function listData() {
    const token = localStorage.getItem("token");
    fetch(URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => { 
        setData(data.results);
        console.log(data);
      });

    fetch(MeURL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyData(data);
      });
  }

  return (
    <div>
      <context.Provider value={{ data, myData }}>
        <Routes>
          <Route path="/" element={<LoginPage listData={listData} />} />
          <Route path="/home" element={<HomePage listData={listData} />} />
          <Route path="/home/:id" element={<IdDataPage />} />
          <Route path="/user/create" element={<AuthorUserCreate />} />
          <Route path="/login" element={<UselocationPage />} />
        </Routes>
      </context.Provider>
    </div>
  );
}

export default App;
export { context };
