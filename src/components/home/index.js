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
      <p>Current api base urls</p>
      <ul>
        <li>{process.env.REACT_APP_API_BASE_URL}</li>
      </ul>
    </div>
  );
}
