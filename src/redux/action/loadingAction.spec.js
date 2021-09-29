import { setLoading, setUnload, resetLoading } from "./loadingAction";
import { mockStore } from "../../utils/uniteTest";

describe("test loading action", () => {
  test("set loading", () => {
    const store = mockStore();
    store.dispatch(setLoading());
    const newState = store.getState();
    expect(newState.loadingReducer.loading).toEqual(1);
  });

  test("set unload", () => {
    const loadingReducer = { loading: 3 };
    const store = mockStore({ loadingReducer });
    store.dispatch(setUnload());
    const newState = store.getState();
    expect(newState.loadingReducer.loading).toEqual(2);
  });

  test("reset error", () => {
    const loadingReducer = { loading: 3 };
    const store = mockStore({ loadingReducer });
    store.dispatch(resetLoading());
    const newState = store.getState();
    expect(newState.loadingReducer.loading).toEqual(0);
  });
});
