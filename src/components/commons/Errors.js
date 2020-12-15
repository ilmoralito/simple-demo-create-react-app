import React from "react";
import styles from "./Errors.module.css";
import { sum, divide } from "../../helpers/collector";

export default function Errors({ errors }) {
  const result = sum(1, 3);
  const anotherResult = divide(3, 1);

  try {
    var eventAnotherResult = divide(3, 0);
  } catch (error) {
    console.error(error.message);
  }

  console.log(result, anotherResult, eventAnotherResult);

  return (
    <ul className={styles.errors}>
      {errors.map((error, index) => (
        <li key={index} className={styles.item}>
          {error}
        </li>
      ))}
    </ul>
  );
}
