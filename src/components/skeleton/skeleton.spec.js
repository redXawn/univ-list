import React from "react";
import { shallow, mount } from "enzyme";

import Skeleton from "./index";

const setup = (props = {}) => {
  const wrapper = shallow(<Skeleton {...props} />);
  return wrapper;
};

describe("Skeleton component", () => {
  it("should render without error", () => {
    const wrapper = setup();
    const modalComponent = wrapper.find("#skeleton-component");
    expect(modalComponent.exists()).toBe(true);
  });
});
