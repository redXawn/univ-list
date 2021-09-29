import React from "react";
import { shallow, mount } from "enzyme";

import NotFound from "./index";

const setup = (props = {}) => {
  const wrapper = shallow(<NotFound {...props} />);
  return wrapper;
};

describe("NotFound component", () => {
  it("should render without error", () => {
    const wrapper = setup();
    expect(wrapper.find("h1").text()).toBe("404");
    expect(wrapper.find("h2").text()).toBe("This page could not be found");
  });
  it("should render with text", () => {
    const wrapper = setup({ text: "This is Not Found" });
    expect(wrapper.find("h2").text()).toBe("This is Not Found");
  });
});
