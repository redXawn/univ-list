import React from "react";
import { shallow } from "enzyme";

import Button from "./index";

const setup = (props = {}) => {
  return shallow(<Button {...props} />);
};

describe("Button component", () => {
  it("should render without error", () => {
    const wrapper = setup();
    const buttonComponent = wrapper.find(".button");
    expect(buttonComponent.exists()).toBe(true);
  });

  it("should render with children", () => {
    const wrapper = setup({ children: "Click me" });
    const buttonComponent = wrapper.find("button");
    expect(buttonComponent.text()).toEqual("Click me");
  });

  it("should render with onClick function", () => {
    const onClick = jest.fn();
    const wrapper = setup({ onClick });
    const buttonComponent = wrapper.find("button");
    buttonComponent.simulate("click");
    expect(onClick.mock.calls.length).toEqual(1);
  });
});
