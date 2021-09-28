import React from "react";
import "./card.scss";

const Card = (props) => {
  const { children, customClassName = "", onClick } = props;

  return (
    <div className={`card ${customClassName}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
