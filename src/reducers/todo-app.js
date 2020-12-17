function getRandomId() {
  return Math.random().toString();
}

function createTask(title) {
  return { id: getRandomId(), title, done: false, isEditing: false };
}

const types = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  TOGGLE: "TOGGLE",
  EDIT: "EDIT",
  CANCEL: "CANCEL",
  CONFIRM: "CONFIRM",
};

export const actionCreators = {
  add: (title) => ({ type: types.ADD, payload: createTask(title) }),
  remove: (id) => ({ type: types.REMOVE, payload: id }),
  toggle: (id) => ({ type: types.TOGGLE, payload: id }),
  edit: (id) => ({ type: types.EDIT, payload: id }),
  cancel: (id) => ({ type: types.CANCEL, payload: id }),
  confirm: (id, title) => ({ type: types.CONFIRM, payload: { id, title } }),
};

export const initialState = {
  items: [
    createTask("Click to remove"),
    createTask("Learn react native"),
    createTask("Write code"),
    createTask("Ship app"),
  ],
};

export function reducer(state, action) {
  switch (action.type) {
    case types.ADD:
      return { ...state, items: [...state.items, action.payload] };
    case types.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case types.TOGGLE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, done: !item.done }
            : { ...item }
        ),
      };
    case types.EDIT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, isEditing: true }
            : { ...item }
        ),
      };
    case types.CANCEL:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, isEditing: false }
            : { ...item }
        ),
      };
    case types.CONFIRM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title, isEditing: false }
            : { ...item }
        ),
      };
    default:
      throw new Error("Invalid action type");
  }
}
