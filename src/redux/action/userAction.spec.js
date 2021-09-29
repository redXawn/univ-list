import { setToken, setEmail, setListFavorite, resetUser } from "./userAction";
import { mockStore } from "../../utils/uniteTest";

describe("test user action", () => {
  test("set token", () => {
    const token = "tokenTes";
    const store = mockStore();
    store.dispatch(setToken(token));
    const newState = store.getState();
    expect(newState.userReducer.token).toEqual(token);
  });

  test("set email", () => {
    const email = "email@gmail.com";
    const store = mockStore();
    store.dispatch(setEmail(email));
    const newState = store.getState();
    expect(newState.userReducer.email).toEqual(email);
  });

  test("set list favorite", () => {
    const favoriteList = [{ name: "fav1" }, { name: "fav2" }];
    const store = mockStore();
    store.dispatch(setListFavorite(favoriteList));
    const newState = store.getState();
    expect(newState.userReducer.listFavorite).toEqual(favoriteList);
  });

  test("reset user", () => {
    const userReducer = {
      token: "tokenTes",
      email: "email@gmail.com",
      listFavorite: [{ name: "fav1" }, { name: "fav2" }],
    };
    const expectedState = {
      token: "",
      email: "",
      listFavorite: [],
    };
    const store = mockStore({ userReducer });
    store.dispatch(resetUser());
    const newState = store.getState();
    expect(newState.userReducer).toEqual(expectedState);
  });
});
