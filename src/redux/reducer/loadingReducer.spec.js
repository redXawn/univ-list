import loadingReducer from "./loadingReducer";

test("returns default", () => {
  const defaultState = {
    loading: 0,
  };
  const newState = loadingReducer(undefined, {});
  expect(newState).toEqual(defaultState);
});

test("triggering increment loading", () => {
  const defaultState = {
    loading: 1,
  };
  const newState = loadingReducer(defaultState, { type: "LOADING" });
  expect(newState.loading).toBe(2);
});

test("triggering decrement loading", () => {
  const defaultState = {
    loading: 2,
  };
  const newState = loadingReducer(defaultState, { type: "UNLOAD" });
  expect(newState.loading).toBe(1);
});

test("triggering reset loading", () => {
  const defaultState = {
    loading: 2,
  };
  const newState = loadingReducer(defaultState, { type: "RESET_LOADING" });
  expect(newState.loading).toBe(0);
});
