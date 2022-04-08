import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UselocationPage() {
  let location = useLocation();
  let sercParms = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    let uid = sercParms.get("uid");
    let token = sercParms.get("token");

    const URL = `https://frebi.willandskill.eu/auth/users/activate/`;
    const payLoad = {
      uid,
      token,
    };
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then(navigate("/"));
  }, []);

  return <div></div>;
}
