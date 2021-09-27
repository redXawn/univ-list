import React from "react";
import "./notFound.scss";

const NotFound = () => {
  return (
    <div className="error-container">
      <div>
        <h1 className="error-status-code">404</h1>
        <h2 className="error-message">This page could not be found</h2>
      </div>
    </div>
  );
};

export default NotFound;
