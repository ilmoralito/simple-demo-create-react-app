import React, { useContext } from "react";
import styles from "./index.module.scss";
import { ShoppingCartContext } from "../../contexts/shopping-cart-context";
import { getTotal } from "../../helpers/collector";

export default function ShoppingCart() {
  const context = useContext(ShoppingCartContext);

  return (
    <div
      className={`${styles.container}`}
      style={{
        right: !context.isOpenShoppingCart ? "-500px" : 0,
        overflow: "auto",
      }}
    >
      <div className={styles.header}>
        <button
          className={styles.button}
          onClick={context.onToggleOpenShoppingCart}
        >
          Toggle
        </button>
      </div>
      <h2 style={{ display: "block" }}>Shopping cart</h2>
      {context.products.length && (
        <>
          <table className={styles.products}>
            {context.products.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                subTotal={product.subTotal}
              />
            ))}
            <tfoot>
              <tr>
                <td>TOTAL</td>
                <td>{getTotal(context.products)}</td>
              </tr>
            </tfoot>
          </table>
          <div className={styles.triggers}>
            <button>Buy</button>
            <button onClick={context.onClearShoppingCart}>
              Clear shopping cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Product({ id, name, price, quantity, subTotal }) {
  const {
    onDeleteProduct,
    onIncreaseQuantity,
    onDecreaseQuantity,
  } = useContext(ShoppingCartContext);

  return (
    <tbody className={styles.product}>
      <tr>
        <td>Product name</td>
        <td>{name}</td>
      </tr>
      <tr>
        <td>Price</td>
        <td>{price}</td>
      </tr>
      <tr>
        <td>Quantity</td>
        <td>{quantity}</td>
      </tr>
      <tr>
        <td>Sub total</td>
        <td>{subTotal}</td>
      </tr>
      <tr>
        <td colSpan={2} className={styles.buttons}>
          <button onClick={() => onDeleteProduct(id)}>Delete</button>
          <div>
            <button onClick={() => onIncreaseQuantity(id)}>&#9650;</button>
            <button onClick={() => onDecreaseQuantity(id)}>&#9660;</button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
