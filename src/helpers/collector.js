export function sum(number1, number2) {
  return number1 + number2;
}

export function divide(number1, number2) {
  if (number2 === 0) {
    throw new Error("Invalid value 0 in operation");
  }

  return number1 / number2;
}
