import React, { useContext } from "react";
import styles from "./index.module.scss";
import { GiShoppingCart } from "react-icons/gi";
import { BooksShoppingCartContext } from "../../contexts/books-shopping-cart-context";
import { getCurrentBooksInCart } from "../../helpers/collector";

export default function BooksShoppingCart() {
  const { toggle, books } = useContext(BooksShoppingCartContext);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={{ cursor: "pointer" }}
    >
      <h2>{getCurrentBooksInCart(books)}</h2>
      <GiShoppingCart />
    </div>
  );
}
