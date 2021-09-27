export const setError = (payload) => (dispatch) => {
  return dispatch({ type: "SET_ERROR", payload });
};

export const resetError = () => (dispatch) => {
  return dispatch({ type: "RESET_ERROR" });
};
