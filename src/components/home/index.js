import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/language-context";

export default function Home() {
  const { language } = useContext(LanguageContext);

  return (
    <div>
      <h1>Home</h1>
      <p>
        Current language is <strong>{language}</strong>
      </p>
    </div>
  );
}
