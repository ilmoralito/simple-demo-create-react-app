import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import { BooksShoppingCartContext } from "../../contexts/books-shopping-cart-context";
import { getBooksTotal } from "../../helpers/collector";

function Item({ id, title, quantity, subTotal, images }) {
  const originalQuantity = quantity;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const { increaseQuantity, decreaseQuantity } = useContext(
    BooksShoppingCartContext
  );

  function handleChange(event) {
    const value = event.target.value;

    if (!value || isNaN(value)) {
      setCurrentQuantity(originalQuantity);

      return;
    }

    setCurrentQuantity(+value);
  }

  return (
    <div className={styles.item}>
      <img
        src={`${process.env.PUBLIC_URL}/book-images/${images[0]}`}
        alt={title}
      />
      <div className={styles.meta}>
        <p>{title}</p>
        <div className={styles.controller}>
          <button onClick={() => decreaseQuantity(id)}>-</button>
          <input
            type="text"
            value={quantity}
            defaultValue={quantity}
            onChange={handleChange}
          />
          <button onClick={() => increaseQuantity(id)}>+</button>
        </div>
      </div>
      <p className={styles.subtotal}>{subTotal}</p>
    </div>
  );
}

function Summary({ books }) {
  return (
    <div className={styles.summary}>
      <div className={styles.total}>
        <p>TOTAL</p>
        <p>${getBooksTotal(books)}</p>
      </div>
      <button>Checkout</button>
    </div>
  );
}

export default function BooksShoppingCartList() {
  const { isOpen, toggle, books } = React.useContext(BooksShoppingCartContext);

  return (
    <div className={styles.container} style={{ right: isOpen ? 0 : "-500px" }}>
      <div className={styles.header}>
        <h2>Cart</h2>
        <button onClick={toggle} className={styles.button}>
          X
        </button>
      </div>
      <div className={styles.main}>
        <div>
          {books.map((book) => (
            <Item key={book.id} {...book} />
          ))}
        </div>
        <Summary books={books} />
      </div>
    </div>
  );
}
