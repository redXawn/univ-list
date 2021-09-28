import React from "react";
import "./skeleton.scss";
const Skeleton = ({ width, height }) => {
  return (
    <span
      id="skeleton-component"
      className="skeleton"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
};

export default Skeleton;
