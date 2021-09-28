import React from "react";
import "./input.scss";

const Input = ({ label, value, onChange, placeholder, error, type }) => {
  return (
    <div className="margin-bottom-20">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input type={type ? type : "text"} placeholder={placeholder} value={value} onChange={onChange} />
      </div>
      {error ? <small className="input-error">{error}</small> : null}
    </div>
  );
};

export default Input;
