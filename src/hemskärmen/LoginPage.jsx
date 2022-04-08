import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    const URL = `https://frebi.willandskill.eu/api-token-auth/`;
    const payLoad = {
      email,
      password,
    };
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        if (token) {
          navigate("/home");
        } else {
          alert("Ange giltig data");
        }
      });
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        {rendInput("text", "email", email, setEmail)}
        {rendInput("password", "password", password, setPassword)}
        <button type="submit">login</button> 
      </form>
    </div>
  );
}
// u can use them to log in
// email: "Akecakabro+2@gmail.com"
// password: "                                                         "
