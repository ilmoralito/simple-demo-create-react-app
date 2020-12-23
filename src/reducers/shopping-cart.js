const types = {
  TOGGLE: "TOGGLE",
  ADD: "ADD",
  DELETE: "DELETE",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  CLEAR: "CLEAR",
};

export const initialState = {
  products: [],
  isOpen: false,
};

export const actionCreators = {
  toggle: () => ({ type: types.TOGGLE }),
  add: (payload) => ({ type: types.ADD, payload }),
  delete: (payload) => ({ type: types.DELETE, payload }),
  increaseQuantity: (payload) => ({ type: types.INCREASE_QUANTITY, payload }),
  decreaseQuantity: (payload) => ({ type: types.DECREASE_QUANTITY, payload }),
  clear: () => ({ type: types.CLEAR }),
};

export function reducer(state, action) {
  switch (action.type) {
    case types.TOGGLE:
      return { ...state, isOpen: !state.isOpen };
    case types.ADD:
      const entry = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (!entry) {
        return {
          ...state,
          products: [
            { ...action.payload, quantity: 1, subTotal: action.payload.price },
            ...state.products,
          ],
        };
      }

      return {
        ...state,
        products: state.products.map((product) =>
          product.id === +action.payload.id
            ? {
                ...product,
                quantity: product.quantity + 1,
                subTotal: product.price * product.quantity + 1,
              }
            : { ...product }
        ),
      };
    case types.DELETE:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== +action.payload
        ),
      };
    case types.INCREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === +action.payload
            ? {
                ...product,
                quantity: product.quantity + 1,
                subTotal: product.price * product.quantity + 1,
              }
            : { ...product }
        ),
      };
    case types.DECREASE_QUANTITY:
      const product = state.products.find(
        (product) => product.id === +action.payload
      );

      if (product.quantity === 1) {
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== +action.payload
          ),
        };
      }

      return {
        ...state,
        products: state.products.map((product) =>
          product.id === +action.payload
            ? {
                ...product,
                quantity: product.quantity - 1,
                subTotal: product.quantity * product.quantity - 1,
              }
            : { ...product }
        ),
      };
    case types.CLEAR:
      return { ...state, products: [] };
    default:
      throw new Error("Invalid action type");
  }
}
