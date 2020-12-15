import React, { useState } from "react";

export default function Person({}) {
                const [firstName, setFirstName] = useState("");
                                  const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

        const payload = { firstName, lastName, email };

    console.log(payload);

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
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
      </div>
    </form>
  );
}
