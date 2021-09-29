const initialState = {
  token: "",
  email: "",
  listFavorite: [],
};
const universitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_LIST_FAVORITE":
      return {
        ...state,
        listFavorite: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        token: "",
        email: "",
        listFavorite: [],
      };
    default:
      return state;
  }
};

export default universitiesReducer;
