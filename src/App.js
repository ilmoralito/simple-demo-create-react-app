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
import { useReducer, useState, useEffect } from "react";
import LanguageSwitch from "./components/language-switch";
import Products from "./components/products";
import ShoppingCart from "./components/shopping-cart";
import {
  initialState,
  actionCreators,
  reducer,
} from "./reducers/shopping-cart";
import Books from "./components/books";
import BooksShoppingCart from "./components/books-shopping-cart";
import { BooksShoppingCartContext } from "./contexts/books-shopping-cart-context";
import BooksShoppingCartList from "./components/books-shopping-cart-list/books-shopping-cart-list";
import {
  initialState as booksInitialState,
  actionCreators as booksActionCreators,
  reducer as booksReducer,
} from "./reducers/books-shopping-cart";
import isEqual from "lodash.isequal";
import usePrevious from "./custom-hooks/usePrevious";
import Table from "./components/table";
import MyForm from "./components/my-form/";

// menu
import menu from "./data/menu.json";
import MenuButton from "./components/menu-button";
import { MenuContext } from "./contexts/menu-context";
import {
  initialState as menuInitialState,
  actionCreators as menuActionCreators,
  reducer as menuReducer,
} from "./reducers/menu";
import Menu from "./components/menu";
import People from "./components/people";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("currentLanguage") ?? languages.en
  );
  const [theme, setTheme] = useState(themes.light);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [booksState, booksDispatch] = useReducer(
    booksReducer,
    booksInitialState
  );

  // menu
  const [menuState, menuDispatch] = useReducer(menuReducer, menuInitialState);

  useEffect(() => {
    menuDispatch(menuActionCreators.add(menu));
  }, []);

  useEffect(() => {
    const payload = localStorage.getItem("books");

    if (payload) {
      booksDispatch(
        booksActionCreators.setInitialStateFromLocalstorage(JSON.parse(payload))
      );
    }
  }, []);

  const deeply = usePrevious(booksState.books);

  useEffect(() => {
    if (!isEqual(deeply, booksState.books)) {
      localStorage.setItem("books", JSON.stringify(booksState.books));
    }
  }, [booksState.books, deeply]);

  useEffect(() => {
    localStorage.setItem("currentLanguage", currentLanguage);
  }, [currentLanguage]);

  function handleToggleTheme() {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  }

  function handleToggleLanguage() {
    const selectedLanguage =
      currentLanguage === languages.en ? languages.es : languages.en;

    setCurrentLanguage(selectedLanguage);
  }

  function handleToggleShoppingCart() {
    dispatch(actionCreators.toggle());
  }

  function handleAddProduct(product) {
    dispatch(actionCreators.add(product));
  }

  function handleDeleteProduct(id) {
    dispatch(actionCreators.delete(id));
  }

  function handleIncreaseQuantity(id) {
    dispatch(actionCreators.increaseQuantity(id));
  }
  // hyg nbvyrn - esto lo puso Gonzalito
  function handleDecreaseQuantity(id) {
    dispatch(actionCreators.decreaseQuantity(id));
  }

  function handleClearShoppingCart() {
    dispatch(actionCreators.clear());
  }

  // books
  function handleToggleBooksShoppingCartList() {
    booksDispatch(booksActionCreators.toggle());
  }

  function handleAddBook(book) {
    booksDispatch(booksActionCreators.add(book));
  }

  function handleIncreaseBookQuantity(id) {
    booksDispatch(booksActionCreators.increaseQuantity(id));
  }

  function handleDecreaseBookQuantity(id) {
    booksDispatch(booksActionCreators.decreaseQuantity(id));
  }

  function handleClearBooks() {
    booksDispatch(booksActionCreators.clear());
  }

  function handleChangeValueManually(payload) {
    booksDispatch(booksActionCreators.changeValueManually(payload));
  }

  // menu
  function handleToggleMenu() {
    menuDispatch(menuActionCreators.toggle());
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
            isOpenShoppingCart: state.isOpen,
            products: state.products,
            onToggleOpenShoppingCart: handleToggleShoppingCart,
            onAddProduct: handleAddProduct,
            onDeleteProduct: handleDeleteProduct,
            onIncreaseQuantity: handleIncreaseQuantity,
            onDecreaseQuantity: handleDecreaseQuantity,
            onClearShoppingCart: handleClearShoppingCart,
          }}
        >
          <BooksShoppingCartContext.Provider
            value={{
              isOpen: booksState.isOpen,
              books: booksState.books,
              toggle: handleToggleBooksShoppingCartList,
              add: handleAddBook,
              increase_quantity: handleIncreaseBookQuantity,
              decrease_quantity: handleDecreaseBookQuantity,
              onChangeValueManually: handleChangeValueManually,
              clear: handleClearBooks,
            }}
          >
            <MenuContext.Provider
              value={{
                isOpen: menuState.isOpen,
                menu: menuState.menu,
                onToggleIsOpen: handleToggleMenu,
              }}
            >
              <div className="App">
                <Menu />
                <MenuButton />
                <LanguageSwitch />
                <ShoppingCart />
                <BooksShoppingCart />
                <BooksShoppingCartList />
                <header
                  className={
                    theme === themes.dark ? "App-header" : "App-header-light"
                  }
                >
                  <ul className="main-nav">
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
                    <li>
                      <Link to="/books">Books</Link>
                    </li>
                    <li>
                      <Link to="/table">Table</Link>
                    </li>
                    <li>
                      <Link to="/my-form">My form</Link>
                    </li>
                    <li>
                      <Link to="/people">People</Link>
                    </li>
                  </ul>
                </header>
                <main>
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
                    <Route path="/products">
                      <Products />
                    </Route>
                    <Route path="/books">
                      <Books />
                    </Route>
                    <Route path="/table">
                      <Table />
                    </Route>
                    <Route path="/my-form">
                      <MyForm />
                    </Route>
                    <Route path="/people">
                      <People />
                    </Route>
                  </Switch>
                </main>
              </div>
            </MenuContext.Provider>
          </BooksShoppingCartContext.Provider>
        </ShoppingCartContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
