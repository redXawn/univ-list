import React from "react";
import "./button.scss";

const Button = ({ customClassName = "", disabled, onClick, children }) => {
  return (
    <button className={`button ${customClassName}`} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
