import React from "react";
import { shallow } from "enzyme";

import Card from "./index";

const setup = (props = {}) => {
  const wrapper = shallow(<Card {...props} />);
  return wrapper;
};

describe("Card component", () => {
  it("should render without error", () => {
    const wrapper = setup();
    const cardComponent = wrapper.find("div");
    expect(cardComponent.exists()).toBe(true);
  });

  it("should render with children", () => {
    const wrapper = setup({ children: "This is card" });
    const cardComponent = wrapper.find("div");
    expect(cardComponent.text()).toEqual("This is card");
  });

  it("should render with onClick function", () => {
    const onClick = jest.fn();
    const wrapper = setup({ onClick });
    const cardComponent = wrapper.find("div");
    cardComponent.simulate("click");
    expect(onClick.mock.calls.length).toEqual(1);
  });
});
