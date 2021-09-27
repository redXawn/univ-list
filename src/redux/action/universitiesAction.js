import axios from "axios";

export const getUniversities = (name, country) => (dispatch) => {
  dispatch({ type: "LOADING" });
  return axios
    .get(`http://universities.hipolabs.com/search?name=trisakti&country=indonesia`)
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
