import logo from "./logo.svg";
import "./App.css";

import Person from "./person";
import Greeting from "./components/greeting";
import Home from "./components/home";

import { Switch, Route, Link } from "react-router-dom";
import About from "./components/about";
import Contact from "./components/contact";
import TodoApp from "./components/todo-app";
import Posts from "./components/posts";
import { PhotoGrid } from "./components/photo-grid";
import { ThemeContext, themes } from "./contexts/theme-context";
import { languages, LanguageContext } from "./contexts/language-context";
import { ShoppingCartContext } from "./contexts/shopping-cart-context";
import { useState } from "react";
import LanguageSwitch from "./components/language-switch";
import Products from "./components/products";
import ShoppingCart from "./components/shopping-cart";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("currentLanguage") ?? languages.en
  );
  const [theme, setTheme] = useState(themes.light);
  // shopping cart context
  const [isOpenShoppingCart, setIsOpenShoppingCart] = useState(false);
  const [products, setProducts] = useState([]);
  const petList = [
    {
      id: 1,
      name: "Hotch",
      isAlive: false,
    },
    {
      id: 2,
      name: "Bonita",
      isAlive: false,
    },
    {
      id: 3,
      name: "Peluso",
      isAlive: false,
    },
    {
      id: 4,
      name: "Nami",
      isAlive: true,
    },
    {
      id: 5,
      name: "Lola",
      isAlive: false,
    },
  ];

  function handleToggleTheme() {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  }

  function handleToggleLanguage() {
    const selectedLanguage =
      currentLanguage === languages.en ? languages.es : languages.en;

    setCurrentLanguage(selectedLanguage);

    localStorage.setItem("currentLanguage", selectedLanguage);
  }

  function handleToggleShoppingCart() {
    setIsOpenShoppingCart(!isOpenShoppingCart);
  }

  function handleAddProduct(product) {
    const entry = products.find((item) => item.id === product.id);

    if (!entry) {
      setProducts([
        ...products,
        { ...product, quantity: 1, subTotal: product.price },
      ]);

      return;
    }

    setProducts(
      products.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subTotal: product.price * item.quantity + 1,
            }
          : { ...item }
      )
    );
  }

  function handleDeleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  function handleIncreaseQuantity(id) {
    setProducts(
      products.map((product) =>
        product.id === +id
          ? {
              ...product,
              quantity: product.quantity + 1,
              subTotal: product.price * product.quantity + 1,
            }
          : { ...product }
      )
    );
  }

  function handleDecreaseQuantity(id) {
    const product = products.find((product) => product.id === +id);

    if (product.quantity === 0) return;

    setProducts(
      products.map((product) =>
        product.id === +id
          ? {
              ...product,
              quantity: product.quantity - 1,
              subTotal: product.quantity * product.quantity - 1,
            }
          : { ...product }
      )
    );
  }

  function handleClearShoppingCart() {
    setProducts([]);
  }

  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage,
        onToggleLanguage: handleToggleLanguage,
      }}
    >
      <ThemeContext.Provider
        value={{ theme, onToggleTheme: handleToggleTheme }}
      >
        <ShoppingCartContext.Provider
          value={{
            isOpenShoppingCart,
            products,
            onToggleOpenShoppingCart: handleToggleShoppingCart,
            onAddProduct: handleAddProduct,
            onDeleteProduct: handleDeleteProduct,
            onIncreaseQuantity: handleIncreaseQuantity,
            onDecreaseQuantity: handleDecreaseQuantity,
            onClearShoppingCart: handleClearShoppingCart,
          }}
        >
          <div className="App">
            <LanguageSwitch />
            <ShoppingCart />
            <header
              className={
                theme === themes.dark ? "App-header" : "App-header-light"
              }
            >
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/todo-app">Todo app</Link>
                </li>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <li>
                  <Link to="/photo-grid">Photo grid</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
              </ul>
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
                <Route path="/todo-app">
                  <TodoApp />
                </Route>
                <Route path="/posts">
                  <Posts />
                </Route>
                <Route path="/photo-grid">
                  <PhotoGrid />
                </Route>
                <Route>
                  <Products />
                </Route>
              </Switch>
              <p>{currentLanguage}</p>
              <img src={logo} className="App-logo" alt="logo" />
              <Greeting />
              <Greeting name="ada" />
              <Greeting name="leon" />

              <p>
                Edit <code>src/App.js</code> and save to reload. Trying...
              </p>
              <Person />
              <Calculator number1={1} number2={2} />
              <Pets pets={petList} />
              <Hello />
              <Hello name="Ada" />
              <Hello name="Wong" />
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </ShoppingCartContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

function Hello({ name = "World!" }) {
  return <p>Hello {name}</p>;
}

function Pets({ pets }) {
  return (
    <ul>
      {pets.map((pet) => (
        <Pet key={pet.id} {...pet} />
      ))}
    </ul>
  );
}

function Pet({ id, name, isAlive }) {
  return (
    <li className={isAlive ? "is-alive" : ""}>
      {name} - has id {id} and is {isAlive ? "alive" : "not alive :("}
    </li>
  );
}

function Calculator({ number1, number2 }) {
  if (!number1) {
    return "number1 is required";
  }

  if (!number2) {
    return "number2 is required";
  }

  const result = number1 + number2;

  return <p>{result}</p>;
}

export default App;
