import React, { useContext } from "react";
import styles from "./index.module.css";
import products from "../../data/products.json";
import { ShoppingCartContext } from "../../contexts/shopping-cart-context";

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      <div className={styles.products}>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

function Product({ id, name, description, price, images }) {
  const { onAddProduct } = useContext(ShoppingCartContext);

  function handleClick() {
    onAddProduct({ id, name, description, price, images });
  }

  return (
    <div className={styles.product}>
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
        <p>${price}</p>
        <div>
          <Gallery images={images} />
        </div>
      </div>
      <div className={styles.trigger}>
        <button onClick={() => handleClick()}>Add to car</button>
      </div>
    </div>
  );
}

function Gallery({ images }) {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image} className={styles.item}>
          <img
            src={`${process.env.PUBLIC_URL}/product-images/${image}`}
            alt={image}
          />
        </li>
      ))}
    </ul>
  );
}
