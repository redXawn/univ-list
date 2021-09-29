import React from "react";
import { shallow } from "enzyme";

import Modal from "./index";

const setup = (props = {}) => {
  const wrapper = shallow(<Modal {...props} />);
  return wrapper;
};

describe("Modal component", () => {
  it("should render without error", () => {
    const wrapper = setup();
    const modalComponent = wrapper.find("#modal-wrapper");
    expect(modalComponent.exists()).toBe(true);
  });

  it("should render modal with children", () => {
    const wrapper = setup({ children: "This is modal" });
    const modalComponent = wrapper.find("#modal-wrapper");
    expect(modalComponent.text()).toEqual("xThis is modal");
  });

  it("should render modal close span", () => {
    const wrapper = setup({ children: "This is modal" });
    const modalComponent = wrapper.find("span");
    expect(modalComponent.text()).toEqual("x");
  });

  it("should render with toggle function", () => {
    const toggle = jest.fn();
    const wrapper = setup({ toggle });
    const modalComponent = wrapper.find("span");
    modalComponent.simulate("click");
    expect(toggle.mock.calls.length).toEqual(1);
  });
});
