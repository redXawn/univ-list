import React from "react";
import "./card.scss";

const Card = (props) => {
  const { children, className, onClick } = props;

  return (
    <div className="card" onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
