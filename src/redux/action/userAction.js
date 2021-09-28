export const setToken = (payload) => (dispatch) => {
  return dispatch({ type: "SET_TOKEN", payload });
};

export const setEmail = (payload) => (dispatch) => {
  return dispatch({ type: "SET_EMAIL", payload });
};
