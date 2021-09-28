import axios from "axios";

export const getUniversities = (name, country) => (dispatch) => {
  dispatch({ type: "LOADING" });
  return axios
    .get(`http://universities.hipolabs.com/search?name=${name}&country=${country}`)
    .then((res) => {
      return dispatch({
        type: "SET_UNIVERSITIES_LIST",
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({ type: "SET_ERROR", payload: { errorMessage: "error", status: true } });
    })
    .then(() => {
      dispatch({ type: "UNLOAD" });
    });
};

export const incrementPagination = () => (dispatch) => {
  return dispatch({ type: "INCREMENT_PAGINATION" });
};

export const setUnivName = (payload) => (dispatch) => {
  return dispatch({ type: "SET_UNIV_NAME", payload });
};

export const setUnivCountry = (payload) => (dispatch) => {
  return dispatch({ type: "SET_UNIV_COUNTRY", payload });
};

export const sortData = (payload) => (dispatch) => {
  return dispatch({ type: "SORT_DATA", payload });
};
