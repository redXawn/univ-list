const initialState = {
  token: "",
  email: "",
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
    default:
      return state;
  }
};

export default universitiesReducer;
