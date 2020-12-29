const types = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  SUCCESS_FETCHING_PERSON: "SUCCESS_FETCHING_PERSON",
  ADD: "ADD",
  EDIT: "EDIT",
  CANCEL: "CANCEL",
  UPDATE: "UPDATE",
};

export const initialState = {
  people: [],
  person: {},
  loading: true,
  error: false,
};

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  success: (payload) => ({ type: types.SUCCESS, payload }),
  failure: () => ({ type: types.FAILURE }),
  successFetchingPerson: (payload) => ({
    type: types.SUCCESS_FETCHING_PERSON,
    payload,
  }),
  add: (payload) => ({ type: types.ADD, payload }),
  edit: (id) => ({ type: types.EDIT, id }),
  cancel: (id) => ({ type: types.CANCEL, id }),
  update: (payload) => ({ type: types.UPDATE, payload }),
};

/**
 *
 * @param {Object} state
 * @param {Object} action
 */
export function reducer(state, action) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false };
    case types.FAILURE:
      return { ...state, loading: false, error: true };
    case types.SUCCESS:
      return { ...state, loading: false, error: false, people: action.payload };
    case types.SUCCESS_FETCHING_PERSON:
      return { ...state, person: action.payload };
    case types.ADD:
      return {
        ...state,
        people: [...state.people._embedded.people, action.payload],
      };
    case types.EDIT:
      return { ...state, person: { ...state.person, isEditing: true } };
    case types.CANCEL:
      return { ...state, person: { ...state.person, isEditing: false } };
    case types.UPDATE:
      return {
        ...state,
        people: state.people._embedded.people.map((person) =>
          person.id === action.payload.id
            ? {
                ...person,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
              }
            : { ...person }
        ),
      };
    default:
      throw new Error("Invalid action type");
  }
}
