import React, { useContext } from "react";
import styles from "./index.module.scss";
import books from "../../data/books.json";
import { BooksShoppingCartContext } from "../../contexts/books-shopping-cart-context";

function Book({
  id,
  title,
  publication_date: publicationDate,
  description,
  price,
  currency,
  images,
  in_stock: inStock,
}) {
  const { add } = useContext(BooksShoppingCartContext);

  function handleClick() {
    add({ id, title, price, images });
  }

  return (
    <div className={styles.item}>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/book-images/${images[0]}`}
          alt={title}
        />
      </div>
      <div>
        <h2>{title}</h2>
        <small>{publicationDate}</small>
        <p>{description}</p>
        <p>
          Price: {currency === "Dollar" ? "$" : "£"}
          {price}
        </p>

        <div>
          <button onClick={handleClick} disabled={inStock === 0}>
            {inStock === 0 ? "Sold out" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Books() {
  return (
    <section>
      <h1 className={styles.title}>Books</h1>
      <div className={styles.container}>
        {books.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
}
