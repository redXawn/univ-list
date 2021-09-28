const initialState = {
  univName: "",
  univCountry: "indonesia",
  universitiesList: [],
  paginationList: [],
  currentPage: 0,
  totalPage: 0,
  sortBy: "",
};
const universitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_UNIVERSITIES_LIST":
      const totalPageCount = Math.ceil(action.payload.length / 10);
      const firstLoad = action.payload.slice(0, 10);
      if (state.sortBy) {
        firstLoad.sort(function (a, b) {
          return a[state.sortBy].localeCompare(b[state.sortBy]);
        });
      }
      return {
        ...state,
        universitiesList: action.payload,
        paginationList: firstLoad,
        currentPage: 1,
        totalPage: totalPageCount,
      };
    case "INCREMENT_PAGINATION":
      const nextSlice = state.currentPage * 10;
      const getMoreData = state.universitiesList.slice(nextSlice, nextSlice + 10);
      let newPaginationList = [...state.paginationList, ...getMoreData];
      if (state.sortBy) {
        newPaginationList.sort(function (a, b) {
          return a[state.sortBy].localeCompare(b[state.sortBy]);
        });
      }
      return {
        ...state,
        paginationList: newPaginationList,
        currentPage: state.currentPage + 1,
      };
    case "SORT_DATA":
      const currentPaginationData = [...state.paginationList];
      const sortPagination = currentPaginationData.sort(function (a, b) {
        return a[action.payload].localeCompare(b[action.payload]);
      });
      return {
        ...state,
        paginationList: sortPagination,
        sortBy: action.payload,
      };
    case "SET_UNIV_NAME":
      return {
        ...state,
        univName: action.payload,
      };
    case "SET_UNIV_COUNTRY":
      return {
        ...state,
        univCountry: action.payload,
      };
    default:
      return state;
  }
};

export default universitiesReducer;
