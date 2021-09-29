import moxios from "moxios";

import { getUniversities, incrementPagination, setUnivName, setUnivCountry, sortData } from "./universitiesAction";
import { mockStore } from "../../utils/uniteTest";

describe("test univ action", () => {
  let data;
  beforeEach(() => {
    data = [
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
  });
  describe("test mock axios", () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });

    test("success response get univ", () => {
      const store = mockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data,
        });
      });
      return store.dispatch(getUniversities("tes", "indonesia")).then(() => {
        const newState = store.getState();
        const pagiantionExpected = [
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
        ];
        expect(newState.universitiesReducer.universitiesList).toEqual(data);
        expect(newState.universitiesReducer.paginationList).toEqual(pagiantionExpected);
        expect(newState.universitiesReducer.totalPage).toEqual(2);
      });
    });

    test("test failed response", () => {
      const store = mockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: "error",
        });
      });
      return store.dispatch(getUniversities("tes", "indonesia")).then(() => {
        const newState = store.getState();
        const expectedState = { errorMessage: "error", status: true };
        expect(newState.errorReducer.error).toEqual(expectedState);
      });
    });
  });

  test("test set increment pagination", () => {
    const universitiesReducer = {
      univName: "",
      univCountry: "indonesia",
      universitiesList: data,
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
    const store = mockStore({ universitiesReducer });
    store.dispatch(incrementPagination());
    const newState = store.getState();
    expect(newState.universitiesReducer.currentPage).toEqual(2);
    expect(newState.universitiesReducer.paginationList).toEqual(data);
  });

  test("test set univ name", () => {
    const univName = "tes univ";
    const store = mockStore();
    store.dispatch(setUnivName(univName));
    const newState = store.getState();
    expect(newState.universitiesReducer.univName).toEqual(univName);
  });

  test("test set univ country", () => {
    const country = "Malaysia";
    const store = mockStore();
    store.dispatch(setUnivCountry(country));
    const newState = store.getState();
    expect(newState.universitiesReducer.univCountry).toEqual(country);
  });

  test("test sort data by name", () => {
    const universitiesReducer = {
      univName: "",
      univCountry: "indonesia",
      universitiesList: data,
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
    const expectedState = [
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
    ];
    const store = mockStore({ universitiesReducer });
    store.dispatch(sortData("name"));
    const newState = store.getState();
    expect(newState.universitiesReducer.sortBy).toEqual("name");
    expect(newState.universitiesReducer.paginationList).toEqual(expectedState);
  });
});
