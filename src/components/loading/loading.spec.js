import React from "react";
import { shallow } from "enzyme";

import Loading from "./index";

const setup = (props = {}) => {
  const wrapper = shallow(<Loading {...props} />);
  return wrapper;
};

describe("Loading component", () => {
  it("should render without error", () => {
    const wrapper = setup();
    const loadingComponent = wrapper.find("#loading-wrapper");
    expect(loadingComponent.exists()).toBe(true);
  });
});
