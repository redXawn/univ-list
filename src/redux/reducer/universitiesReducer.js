const initialState = {
  universitiesList: [],
  paginationList: [],
  currentPage: 0,
  totalPage: 0,
};
const universitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_UNIVERSITIES_LIST":
      const totalPageCount = Math.ceil(action.payload.length / 10);
      return {
        ...state,
        universitiesList: action.payload,
        paginationList: action.payload.slice(0, 10),
        currentPage: 1,
        totalPage: totalPageCount,
      };
    case "INCREMENT_PAGINATION":
      const nextSlice = state.currentPage * 10;
      const getMoreData = state.universitiesList.slice(nextSlice, nextSlice + 10);
      const newPaginationList = [...state.paginationList, ...getMoreData];
      return {
        ...state,
        paginationList: newPaginationList,
        currentPage: state.currentPage + 1,
      };
    default:
      return state;
  }
};

export default universitiesReducer;
