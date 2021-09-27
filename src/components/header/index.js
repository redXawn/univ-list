import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./header.scss";

const links = [
  { url: "/", label: "Home" },
  { url: "/profile", label: "Profile" },
];

const Header = () => {
  const history = useHistory();

  function handleClickLink(link) {
    history.push(link);
  }

  return (
    <nav className="header--wrapper">
      <div className="header-text">
        {links.map((data, index) => (
          <h2 key={index} onClick={() => handleClickLink(data.url)}>
            {data.label}
          </h2>
        ))}
      </div>
    </nav>
  );
};

export default Header;
