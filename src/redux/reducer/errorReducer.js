const initialState = {
  error: {
    errorMessage: "",
    status: false,
  },
};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR":
      const newError = { ...state.error };
      for (let key in action.payload) {
        newError[key] = action.payload[key];
      }
      return {
        ...state,
        error: newError,
      };
    case "RESET_ERROR":
      const resetError = { ...state.error };
      return {
        ...state,
        error: resetError,
      };
    default:
      return state;
  }
};

export default errorReducer;
