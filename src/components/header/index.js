import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loading from "../loading";
import { getUniversities, setUnivCountry, setUnivName } from "../../redux/action/universitiesAction";
import MagnifyingGlass from "../../assets/magnifying-glass-solid.svg";
import "./header.scss";

const Modal = lazy(() => import("../modal"));
const Input = lazy(() => import("../input"));
const Button = lazy(() => import("../button"));

const links = [
  { url: "/", label: "Home" },
  { url: "/profile", label: "Profile" },
];

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModalSearch, setModalSearch] = useState(false);
  const [univCountryState, setUnivCountryState] = useState("");
  const [univNameState, setUnivNameState] = useState("");

  function handleClickLink(link) {
    history.push(link);
  }

  function closeModalSearch() {
    setModalSearch(false);
    setUnivNameState("");
    setUnivCountryState("");
  }

  function renderModalSearch() {
    return (
      <Suspense fallback={<Loading />}>
        <Modal show={showModalSearch} toggle={closeModalSearch}>
          <div className="w--80 margin-auto padding-10">
            <div className="margin-bottom-30">
              <Input
                label="University Name"
                placeholder="Name"
                value={univNameState}
                onChange={(e) => setUnivNameState(e.target.value)}
              />
              <Input
                label="University Country"
                placeholder="Name"
                value={univCountryState}
                onChange={(e) => setUnivCountryState(e.target.value)}
              />
            </div>
            <Button
              disabled={!univNameState && !univCountryState}
              onClick={() => {
                closeModalSearch();
                dispatch(setUnivName(univNameState));
                dispatch(setUnivCountry(univCountryState));
                dispatch(getUniversities(univNameState, univCountryState));
              }}>
              Find University
            </Button>
          </div>
        </Modal>
      </Suspense>
    );
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
      <img
        onClick={() => setModalSearch(!showModalSearch)}
        className="header-icon"
        src={MagnifyingGlass}
        alt="Magnifyng Glass"
      />
      {renderModalSearch()}
    </nav>
  );
};

export default Header;
