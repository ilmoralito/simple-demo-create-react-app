const types = {
  TOGGLE: "TOGGLE",
  ADD: "ADD",
};

export const initialState = {
  isOpen: false,
  menu: {},
};

export const actionCreators = {
  toggle: () => ({ type: types.TOGGLE }),
  add: (payload) => ({ type: types.ADD, payload }),
};

export function reducer(state, action) {
  switch (action.type) {
    case types.TOGGLE:
      return { ...state, isOpen: !state.isOpen };
    case types.ADD:
      return { ...state, menu: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}
