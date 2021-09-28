import React from "react";
import "./input.scss";

const Input = ({ label, value, onChange, placeholder, error }) => {
  return (
    <div>
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
      </div>
      {error ? <small className="input-error">{error}</small> : null}
    </div>
  );
};

export default Input;
