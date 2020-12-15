import React, { useState } from "react";
import Errors from "../components/commons/Errors";
import Button from "../components/commons/Button";
import styles from "./index.module.scss";

export default function Person({}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload = { firstName, lastName, email };

    console.log(payload);

    setFirstName("");
    setLastName("");
    setEmail("");
  }

  const logo512 = process.env.PUBLIC_URL + "logo512.png";

  return (
    <div>
      <img src={logo512} alt="logo512" />
      {Object.keys(errors).length > 0 && (
        <Errors errors={Object.values(errors)} />
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
          <Button type="submit">Custom submit</Button>
        </div>
      </form>
    </div>
  );
}
