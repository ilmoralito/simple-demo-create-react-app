import React, { Fragment, useContext, useState } from "react";
import styles from "./index.module.scss";
import { MenuContext } from "../../contexts/menu-context";
import { capitalize } from "../../helpers/collector";

function Header({ onToggle }) {
  return (
    <>
      <h2>MENU</h2>
      <div className="controls">
        <button onClick={onToggle}>X</button>
      </div>
    </>
  );
}

function PizzaItems({ items }) {
  return (
    <>
      <p>{JSON.stringify(items, null, 2)}</p>
    </>
  );
}

function OtherItems({ items }) {
  return (
    <>
      <p>{JSON.stringify(items, null, 2)}</p>
      <ul>
        <li className={styles.entry}>
          {items.map(({ id, name, description, images, price }) => (
            <Fragment key={id}>
              <img
                src={`${process.env.PUBLIC_URL}/menu-images/${images[0]}`}
                alt={name}
              />
              <div>
                <p>{name}</p>
                <p>{description}</p>
                <p>${price}</p>
              </div>
              <button className={styles.button}>Add</button>
            </Fragment>
          ))}
        </li>
      </ul>
    </>
  );
}

function CurrentMenu({ menu }) {
  const [items, setItems] = useState(() => {
    const clone = JSON.parse(JSON.stringify(menu));

    for (const key in clone) {
      if (Object.hasOwnProperty.call(clone, key)) {
        clone[key]["expanded"] = false;
      }
    }

    return clone;
  });

  function handleToggleSubmenu(key) {
    const clonedState = JSON.parse(JSON.stringify(items));

    clonedState[key].expanded = !clonedState[key].expanded;

    setItems(clonedState);
  }

  return (
    <div className={styles.item}>
      <ul className={styles.menu}>
        {Object.keys(menu).map((key) => (
          <li key={key} className={styles.item}>
            <button onClick={() => handleToggleSubmenu(key)}>
              <strong>{capitalize(key)}</strong>
            </button>
            {key === "pizza" ? (
              <PizzaItems items={menu[key]} />
            ) : (
              <OtherItems items={menu[key]} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tables() {
  return (
    <div className={styles.item}>
      <h2>Tables</h2>
    </div>
  );
}

export default function Menu() {
  const { isOpen, menu, onToggleIsOpen } = useContext(MenuContext);

  return (
    <div
      className={styles.container}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className={styles.header}>
        <Header onToggle={onToggleIsOpen} />
      </div>
      <div className={styles.body}>
        <CurrentMenu menu={menu} />
        <Tables />
      </div>
    </div>
  );
}
