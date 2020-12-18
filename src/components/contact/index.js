import React, { useContext, useState } from "react";
import MyContext from "../../contexts/my-context";
import ThemedButton from "../commons/themed-button";

export default function Contact() {
  const context = useContext(MyContext);

  return (
    <div>
      <h1>Contact {context}</h1>
      <Toolbar />
    </div>
  );
}

function Toolbar() {
  return <ThemedButton>Change theme</ThemedButton>;
}
