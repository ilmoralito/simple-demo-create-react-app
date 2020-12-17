const types = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  FILTER: "FILTER",
};

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: () => ({ type: types.FAILURE }),
  success: (payload) => ({ type: types.SUCCESS, payload }),
  filter: (payload) => ({ type: types.FILTER, payload }),
};

export const initialState = {
  loading: true,
  error: false,
  posts: [],
  filterText: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false };
    case types.FAILURE:
      return { ...state, loading: false, error: true };
    case types.SUCCESS:
      return { ...state, loading: false, error: false, posts: action.payload };
    case types.FILTER:
      return { ...state, posts: [...state.posts], filterText: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}
