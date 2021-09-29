import React from "react";
import { shallow } from "enzyme";

import Input from "./index";

const setup = (props = {}) => {
  return shallow(<Input {...props} />);
};

describe("Input component", () => {
  it("should render without error", () => {
    const wrapper = setup();
    const buttonComponent = wrapper.find(".input-wrapper");
    expect(buttonComponent.exists()).toBe(true);
  });

  it("should render with label", () => {
    const wrapper = setup({ label: "Input Email" });
    expect(wrapper.find("label").text()).toBe("Input Email");
  });
});
