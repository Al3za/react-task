import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { context } from "../App";

export default function HomePage(props) {
  useEffect(() => {
    props.listData();
  }, []);

  const [name, setName] = useState("");
  const [organisationNr, setOrgNr] = useState("");
  const [vatNr, setVatNr] = useState("");
  const [reference, setRef] = useState("");
  const [paymentTerm, setPayTerm] = useState("");
  const [website, setWebside] = useState("");
  const [email, setMail] = useState("");
  const [phoneNumber, setPhoneNR] = useState("");

  const { data, myData } = useContext(context);

  const URL = `https://frebi.willandskill.eu/api/v1/customers/`;
  const token = localStorage.getItem("token");

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
    const payload = {
      name,
      organisationNr,
      vatNr,
      reference,
      paymentTerm,
      website,
      email,
      phoneNumber,
    };
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => props.listData());
  }

  return (
    <div>
      <h1>List name</h1>
      <form onSubmit={handleSubmit}>
        {rendInput("text", "name", name, setName)}
        {rendInput("text", "organisationNr", organisationNr, setOrgNr)}
        <input 
                placeholder="Vat Number"
                        value={vatNr}
                        onChange={e => setVatNr(e.target.value)} 
                        pattern="SE\d{10}"
                        required
                        title="VatNr ska börja med SE och följas av 10 siffror"

                        //  ///^SE[0-9]{10}$ 
                        //  ^ - start of string $ - end of string 
            />
        {rendInput("text", "reference", reference, setRef)}
        {rendInput("text", "paymentTerm", paymentTerm, setPayTerm)}
        {rendInput("text", "website", website, setWebside)}
        {rendInput("text", "email", email, setMail)}
        {rendInput("text", "phoneNumber", phoneNumber, setPhoneNR)}
        <button type="submit">submit</button>
      </form>

      {data.map((item, index) => {
        return (
          <p key={index}>
            <Link to={`${item.id}`}>{item.name} </Link>
          </p>
        );
      })}

      <p>{myData.email} </p>
      <p>{myData.firstName}</p>
      <p>{myData.lastName} </p>
    </div>
  );
}

