import React from "react";
import "./Button.css";

export default function Button({ type = "submit", children }) {
  return (
    <button type={type} className="button">
      {children}
    </button>
  );
}
