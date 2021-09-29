import errorReducer from "./errorReducer";

test("returns default false", () => {
  const newState = errorReducer(undefined, {});
  expect(newState.error.status).toBe(false);
});

test("set error", () => {
  const error = {
    errorMessage: "error",
    status: true,
  };
  const newState = errorReducer(undefined, { type: "SET_ERROR", payload: error });
  expect(newState.error).toEqual(error);
});

test("reset error", () => {
  const error = {
    errorMessage: "error",
    status: true,
  };
  const expectedState = {
    errorMessage: "",
    status: false,
  };
  const newState = errorReducer(undefined, { type: "RESET_ERROR", payload: error });
  expect(newState.error).toEqual(expectedState);
});
