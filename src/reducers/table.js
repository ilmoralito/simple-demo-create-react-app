const types = {
  ADD: "ADD",
  SORT: "SORT",
  APPLY_SORT: "APPLY_SORT",
};

export const initialState = {
  data: [],
  sortBy: "Title",
  orderBy: "desc",
};

export const actionCreators = {
  add: (payload) => ({ type: types.ADD, payload }),
  sort: (payload) => ({ type: types.SORT, payload }),
  applySort: () => ({ type: types.APPLY_SORT }),
};

export function reducer(state, action) {
  switch (action.type) {
    case types.ADD:
      return { ...state, data: action.payload };
    case types.SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        orderBy: action.payload.orderBy,
      };
    case types.APPLY_SORT:
      if (state.sortBy === "Title") {
        return {
          ...state,
          data: state.data
            .slice(0)
            .sort((a, b) =>
              state.orderBy === "desc"
                ? a.title < b.title
                  ? -1
                  : a.title > b.title
                  ? 1
                  : 0
                : b.title < a.title
                ? -1
                : b.title > a.title
                ? 1
                : 0
            ),
        };
      }

      if (state.sortBy === "Year") {
        return {
          ...state,
          data: state.data
            .slice(0)
            .sort((a, b) =>
              state.orderBy === "desc" ? +a.year - +b.year : +b.year - +a.year
            ),
        };
      }

      if (state.sortBy === "Publication date") {
        return {
          ...state,
          data: state.data
            .slice(0)
            .sort((a, b) =>
              state.orderBy === "desc"
                ? new Date(a.publication_date).getTime() -
                  new Date(b.publication_date).getTime()
                : new Date(b.publication_date).getTime() -
                  new Date(a.publication_date).getTime()
            ),
        };
      }

      return { ...state };
    default:
      throw new Error("Invalid action type");
  }
}
