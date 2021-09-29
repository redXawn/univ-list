export const setToken = (payload) => (dispatch) => {
  return dispatch({ type: "SET_TOKEN", payload });
};

export const setEmail = (payload) => (dispatch) => {
  return dispatch({ type: "SET_EMAIL", payload });
};

export const setListFavorite = (payload) => (dispatch) => {
  return dispatch({ type: "SET_LIST_FAVORITE", payload });
};

export const resetUser = () => (dispatch) => {
  return dispatch({ type: "RESET_USER" });
};
