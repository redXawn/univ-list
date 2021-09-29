import userReducer from "./userReducer";

test("returns default", () => {
  const defaultState = {
    token: "",
    email: "",
    listFavorite: [],
  };
  const newState = userReducer(undefined, {});
  expect(newState).toEqual(defaultState);
});

test("triggering set token", () => {
  const payload = "testoken123";
  const newState = userReducer(undefined, { type: "SET_TOKEN", payload });
  expect(newState.token).toBe(payload);
});

test("triggering set email", () => {
  const payload = "tes2gmail.com";
  const newState = userReducer(undefined, { type: "SET_EMAIL", payload });
  expect(newState.email).toBe(payload);
});

test("triggering set list favorite", () => {
  const payload = [{ name: "fav1" }, { name: "fav2" }];
  const newState = userReducer(undefined, { type: "SET_LIST_FAVORITE", payload });
  expect(newState.listFavorite).toBe(payload);
});

test("triggering reset user", () => {
  const defaultState = {
    token: "testoken",
    email: "tes@gmail.com",
    listFavorite: [],
  };
  const expectedState = {
    token: "",
    email: "",
    listFavorite: [],
  };
  const newState = userReducer(defaultState, { type: "RESET_USER" });
  expect(newState).toEqual(expectedState);
});
