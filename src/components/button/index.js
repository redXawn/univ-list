import React from "react";
import "./button.scss";

const Button = ({ disabled, onClick, children }) => {
  return (
    <button className="button" disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
