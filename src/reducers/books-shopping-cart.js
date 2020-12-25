const types = {
  TOGGLE: "TOGGLE",
  ADD: "ADD",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  CHANGE_VALUE_MANUALLY: "CHANGE_VALUE_MANUALLY",
  CLEAR: "CLEAR",
};

export const initialState = {
  isOpen: false,
  books: [],
};

export const actionCreators = {
  toggle: () => ({ type: types.TOGGLE }),
  add: (payload) => ({ type: types.ADD, payload }),
  increaseQuantity: (payload) => ({
    type: types.INCREASE_QUANTITY,
    payload,
  }),
  decreaseQuantity: (payload) => ({
    type: types.DECREASE_QUANTITY,
    payload,
  }),
  changeValueManually: (payload) => ({
    type: types.CHANGE_VALUE_MANUALLY,
    payload,
  }),
  clear: () => ({ type: types.CLEAR }),
};

export function reducer(state, action) {
  switch (action.type) {
    case types.TOGGLE:
      return { ...state, isOpen: !state.isOpen };
    case types.ADD:
      if (!state.books.length) {
        return {
          ...state,
          books: [
            { ...action.payload, quantity: 1, subTotal: action.payload.price },
          ],
          isOpen: true,
        };
      }

      const book = state.books.find((book) => book.id === +action.payload.id);

      if (!book) {
        return {
          ...state,
          books: [
            {
              ...action.payload,
              quantity: 1,
              subTotal: action.payload.price,
            },
            ...state.books,
          ],
          isOpen: true,
        };
      }

      return {
        ...state,
        books: state.books.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subTotal: item.price * (item.quantity + 1),
              }
            : { ...item }
        ),
        isOpen: true,
      };
    case types.INCREASE_QUANTITY:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === +action.payload
            ? {
                ...book,
                quantity: book.quantity + 1,
                subTotal: book.price * (book.quantity + 1),
              }
            : { ...book }
        ),
      };
    case types.DECREASE_QUANTITY:
      const entry = state.books.find((book) => book.id === +action.payload);

      if (entry.quantity === 1) {
        return {
          ...state,
          books: state.books.filter((book) => book.id !== +action.payload),
        };
      }

      return {
        ...state,
        books: state.books.map((book) =>
          book.id === +action.payload
            ? {
                ...book,
                quantity: book.quantity - 1,
                subTotal: book.price * (book.quantity - 1),
              }
            : { ...book }
        ),
      };
    case types.CHANGE_VALUE_MANUALLY:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === +action.payload.id
            ? {
                ...book,
                quantity: +action.payload.quantity,
                subTotal: book.price * +action.payload.quantity,
              }
            : { ...book }
        ),
      };
    case types.CLEAR:
      return { ...state, books: [] };
    default:
      throw new Error("Invalid action type");
  }
}
