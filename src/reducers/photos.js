const types = {
  LOADING: "LOADING",
  FAILURE: "FAILURE",
  SUCCESS: "SUCCESS",
};

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: () => ({ type: types.FAILURE }),
  success: (photos, page) => ({
    type: types.SUCCESS,
    payload: { photos, page },
  }),
};

export const initialState = {
  loading: false,
  error: false,
  photos: [],
  nextPage: 1,
};

export function reducer(state, action) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false };
    case types.FAILURE:
      return { ...state, error: true, loading: false };
    case types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        photos: [...state.photos, action.payload.photos],
        nextPage: state.nextPage + 1,
      };
    default:
      throw new Error("Invalid action type");
  }
}
