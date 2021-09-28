import React from "react";
import "./input.scss";

const Input = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default Input;
