import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button1 } from "./Button1";

const Button2 = styled(Button1)`
  background: red;
  color: white;
`;

export default function RendIdDataPage(props) {
  const [name, setName] = useState("");
  const [organisationNr, setOrgNr] = useState("");
  const [vatNr, setVatNr] = useState("");
  const [reference, setRef] = useState("");
  const [paymentTerm, setPayTerm] = useState("");
  const [website, setWebside] = useState("");
  const [email, setMail] = useState("");
  const [phoneNumber, setPhoneNR] = useState("");

  const navigate = useNavigate();
  const id = props.id;
  const URL = `https://frebi.willandskill.eu/api/v1/customers/${id}/`;
  const token = localStorage.getItem("token");

  const [dataId, setDataId] = useState(null);

  useEffect(() => {
    fetch(URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDataId(data));
  },[]);

  function handleDelete() {
    fetch(URL, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(()=>navigate("/home"));
    //När man clickar på DELETE button, det kan ta en stund innan ändringar renderas ut.
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
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/home");
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
      <h1>personal data</h1>

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
            />
        {rendInput("text", "reference", reference, setRef)}
        {rendInput("text", "paymentTerm", paymentTerm, setPayTerm)}
        {rendInput("text", "website", website, setWebside)}
        {rendInput("text", "email", email, setMail)}
        {rendInput("text", "phoneNumber", phoneNumber, setPhoneNR)}
        <Button1 type="submit">submit</Button1>
      </form>

      {dataId ? (
        <>
          <p>{dataId.name}</p>
          <p>{dataId.organisationNr}</p>
          <p>{dataId.vatNr}</p>
          <p>{dataId.reference}</p>
          <p>{dataId.paymentTerm}</p>
          <p>{dataId.website}</p>
          <p>{dataId.email}</p>
          <p>{dataId.phoneNumber}</p>
          <Button2 onClick={handleDelete}>delete</Button2>
        </>
      ) : (
        "Not Found"
      )}
    </div>
  );
}
