import universitiesReducer from "./universitiesReducer";

test("returns default", () => {
  const defaultState = {
    univName: "",
    univCountry: "indonesia",
    universitiesList: [],
    paginationList: [],
    currentPage: 0,
    totalPage: 0,
    sortBy: "",
  };
  const newState = universitiesReducer(undefined, {});
  expect(newState).toEqual(defaultState);
});

test("triggering set univ list", () => {
  const payload = [
    { id: 1, name: "a" },
    { id: 2, name: "c" },
    { id: 3, name: "b" },
    { id: 4, name: "d" },
    { id: 5, name: "e" },
    { id: 6, name: "f" },
    { id: 7, name: "g" },
    { id: 8, name: "h" },
    { id: 9, name: "i" },
    { id: 10, name: "j" },
    { id: 11, name: "k" },
    { id: 12, name: "l" },
    { id: 13, name: "m" },
    { id: 14, name: "n" },
    { id: 15, name: "o" },
    { id: 16, name: "p" },
    { id: 17, name: "q" },
    { id: 18, name: "r" },
    { id: 19, name: "s" },
    { id: 20, name: "t" },
  ];
  const defaultState = {
    univName: "",
    univCountry: "indonesia",
    universitiesList: [],
    paginationList: [],
    currentPage: 0,
    totalPage: 0,
    sortBy: "name",
  };
  const expectedState = {
    univName: "",
    univCountry: "indonesia",
    universitiesList: [
      { id: 1, name: "a" },
      { id: 2, name: "c" },
      { id: 3, name: "b" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
      { id: 11, name: "k" },
      { id: 12, name: "l" },
      { id: 13, name: "m" },
      { id: 14, name: "n" },
      { id: 15, name: "o" },
      { id: 16, name: "p" },
      { id: 17, name: "q" },
      { id: 18, name: "r" },
      { id: 19, name: "s" },
      { id: 20, name: "t" },
    ],
    paginationList: [
      { id: 1, name: "a" },
      { id: 3, name: "b" },
      { id: 2, name: "c" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
    ],
    currentPage: 1,
    totalPage: 2,
    sortBy: "name",
  };
  const newState = universitiesReducer(defaultState, { type: "SET_UNIVERSITIES_LIST", payload });
  expect(newState).toEqual(expectedState);
});

test("triggering increment pagination with sorting by name", () => {
  const defaultState = {
    univName: "",
    univCountry: "indonesia",
    universitiesList: [
      { id: 1, name: "a" },
      { id: 2, name: "c" },
      { id: 3, name: "b" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
      { id: 11, name: "k" },
      { id: 12, name: "l" },
      { id: 13, name: "m" },
      { id: 14, name: "n" },
      { id: 15, name: "o" },
      { id: 16, name: "p" },
      { id: 17, name: "q" },
      { id: 18, name: "r" },
      { id: 19, name: "s" },
      { id: 20, name: "t" },
    ],
    paginationList: [
      { id: 1, name: "a" },
      { id: 2, name: "c" },
      { id: 3, name: "b" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
    ],
    currentPage: 1,
    totalPage: 0,
    sortBy: "name",
  };
  const expectedState = {
    univName: "",
    univCountry: "indonesia",
    universitiesList: [
      { id: 1, name: "a" },
      { id: 2, name: "c" },
      { id: 3, name: "b" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
      { id: 11, name: "k" },
      { id: 12, name: "l" },
      { id: 13, name: "m" },
      { id: 14, name: "n" },
      { id: 15, name: "o" },
      { id: 16, name: "p" },
      { id: 17, name: "q" },
      { id: 18, name: "r" },
      { id: 19, name: "s" },
      { id: 20, name: "t" },
    ],
    paginationList: [
      { id: 1, name: "a" },
      { id: 3, name: "b" },
      { id: 2, name: "c" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
      { id: 11, name: "k" },
      { id: 12, name: "l" },
      { id: 13, name: "m" },
      { id: 14, name: "n" },
      { id: 15, name: "o" },
      { id: 16, name: "p" },
      { id: 17, name: "q" },
      { id: 18, name: "r" },
      { id: 19, name: "s" },
      { id: 20, name: "t" },
    ],
    currentPage: 2,
    totalPage: 0,
    sortBy: "name",
  };
  const newState = universitiesReducer(defaultState, { type: "INCREMENT_PAGINATION" });
  expect(newState).toEqual(expectedState);
});

test("triggering sort data", () => {
  const defaultState = {
    univName: "",
    univCountry: "indonesia",
    universitiesList: [],
    paginationList: [
      { id: 1, name: "a" },
      { id: 2, name: "c" },
      { id: 3, name: "b" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
    ],
    currentPage: 1,
    totalPage: 0,
    sortBy: "",
  };
  const expectedState = {
    univName: "",
    univCountry: "indonesia",
    universitiesList: [],
    paginationList: [
      { id: 1, name: "a" },
      { id: 3, name: "b" },
      { id: 2, name: "c" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
      { id: 6, name: "f" },
      { id: 7, name: "g" },
      { id: 8, name: "h" },
      { id: 9, name: "i" },
      { id: 10, name: "j" },
    ],
    currentPage: 1,
    totalPage: 0,
    sortBy: "name",
  };
  const newState = universitiesReducer(defaultState, { type: "SORT_DATA", payload: "name" });
  expect(newState).toEqual(expectedState);
});

test("triggering set univ name", () => {
  const payload = "tes univ";
  const newState = universitiesReducer(undefined, { type: "SET_UNIV_NAME", payload });
  expect(newState.univName).toBe(payload);
});

test("triggering set univ country", () => {
  const payload = "Malaysia";
  const newState = universitiesReducer(undefined, { type: "SET_UNIV_COUNTRY", payload });
  expect(newState.univCountry).toBe(payload);
});

// test("triggering set email", () => {
//   const payload = "tes2gmail.com";
//   const newState = universitiesReducer(undefined, { type: "SET_EMAIL", payload });
//   expect(newState.email).toBe(payload);
// });

// test("triggering set list favorite", () => {
//   const payload = [{ name: "fav1" }, { name: "fav2" }];
//   const newState = universitiesReducer(undefined, { type: "SET_LIST_FAVORITE", payload });
//   expect(newState.listFavorite).toBe(payload);
// });

// test("triggering reset user", () => {
//   const defaultState = {
//     token: "testoken",
//     email: "tes@gmail.com",
//     listFavorite: [],
//   };
//   const expectedState = {
//     token: "",
//     email: "",
//     listFavorite: [],
//   };
//   const newState = universitiesReducer(defaultState, { type: "RESET_USER" });
//   expect(newState).toEqual(expectedState);
// });
