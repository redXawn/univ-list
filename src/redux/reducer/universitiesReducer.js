const initialState = {
  universities: [],
};
const universitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_UNIVERSITIES_LIST":
      return {
        ...state,
        universities: action.payload,
      };
    default:
      return state;
  }
};

export default universitiesReducer;
