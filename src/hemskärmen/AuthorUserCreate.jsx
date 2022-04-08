import React, { useState } from "react";

export default function AuthorUserCreate() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [organisationKind, setOrgKind] = useState("");
  const [organisationName, setOrgName] = useState("");
  const [password, setPassword] = useState("");

  const [rendData, setRendData] = useState([]);

  const URL = `https://frebi.willandskill.eu/auth/users/`;
  const token = localStorage.getItem("token");

  function handleSubmit(e) {
    e.preventDefault();

    const payLoad = {
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind,
    };

    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then((data) => {
        setRendData(data.results);
      });
  }

  function rendInput(type, placeholder, value, setValue) {
    return (
      <input
        type={type}
        placeholder={placeholder} 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  return (
    <div>
      <h1>User Create Page</h1>
      <form onSubmit={handleSubmit}>
        {rendInput("text", "email", email, setEmail)}
        {rendInput("text", "firstName", firstName, setFirstName)}
        {rendInput("text", "lastName", lastName, setLastName)}
        {rendInput("text", "organisationName", organisationName, setOrgName)}
        {rendInput("text", "organisationKind", organisationKind, setOrgKind)}
        {rendInput("text", "password", password, setPassword)}
        <button type="submit">submit</button>
      </form>
      </div>
  );
}

