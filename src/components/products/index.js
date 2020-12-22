import React, { useContext, useState } from "react";
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
  const [currentImage, setCurrentImage] = useState(images[0]);

  function handleClick(image) {
    setCurrentImage(image);
  }

  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/product-images/${currentImage}`}
        className={styles.image}
      />
      <ul className={styles.gallery}>
        {images.length > 1 &&
          images.map((image, index) => (
            <li
              key={image}
              className={styles.item}
              style={{
                backgroundColor: currentImage === image ? "#eee" : "white",
              }}
            >
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();

                  handleClick(image);
                }}
              >
                {++index}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
