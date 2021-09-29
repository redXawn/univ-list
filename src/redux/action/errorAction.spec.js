import { setError, resetError } from "./errorAction";
import { mockStore } from "../../utils/uniteTest";

describe("test error action", () => {
  test("set error", () => {
    const error = { errorMessage: "error", status: true };
    const store = mockStore();
    store.dispatch(setError(error));
    const newState = store.getState();
    expect(newState.errorReducer.error).toEqual(error);
  });

  test("reset error", () => {
    const errorReducer = { error: { errorMessage: "error", status: true } };
    const expectedState = {
      errorMessage: "",
      status: false,
    };
    const store = mockStore({ errorReducer });
    store.dispatch(resetError());
    const newState = store.getState();
    expect(newState.errorReducer.error).toEqual(expectedState);
  });
});
