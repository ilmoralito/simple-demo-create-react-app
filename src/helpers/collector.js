export function sum(number1, number2) {
  return number1 + number2;
}

export function divide(number1, number2) {
  if (number2 === 0) {
    throw new Error("Invalid value 0 in operation");
  }

  return number1 / number2;
}

export function hasEntries(object) {
  return Object.keys(object).length > 0;
}

export function getWindowWidth() {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}

export function getWindowHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
}

export function getWindowAndHeight() {
  const width = getWindowWidth();
  const height = getWindowHeight();

  return { width, height };
}

export function getTotal(products) {
  const result = products.reduce((a, c) => a + c.subTotal, 0);

  return result.toFixed(2);
}

export function getCurrentBooksInCart(books) {
  return books.map((book) => book.quantity).reduce((a, c) => a + c, 0);
}

export function getBooksTotal(books) {
  const result = books.reduce((a, c) => a + c.subTotal, 0);

  return result.toFixed(2);
}
