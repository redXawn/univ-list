import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

import Loading from "../loading";
import { getUniversities, setUnivCountry, setUnivName } from "../../redux/action/universitiesAction";
import { setToken, setEmail } from "../../redux/action/userAction";
import MagnifyingGlass from "../../assets/magnifying-glass-solid.svg";
import "./header.scss";

const Modal = lazy(() => import("../modal"));
const Input = lazy(() => import("../input"));
const Button = lazy(() => import("../button"));

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showModalSearch, setModalSearch] = useState(false);
  const [univCountryState, setUnivCountryState] = useState("");
  const [univNameState, setUnivNameState] = useState("");

  const token = useSelector((state) => state.userReducer.token);

  useEffect(() => {
    if (localStorage.getItem("token") && !token) {
      const token = localStorage.getItem("token");
      const decoded = jwt.verify(token, "secret");
      dispatch(setToken(token));
      dispatch(setEmail(decoded.email));
    }
  }, []);

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
        <h2 onClick={() => handleClickLink("/")}>Home</h2>
        {localStorage.getItem("token") ? (
          <h2 onClick={() => handleClickLink("/profile")}>Profile</h2>
        ) : (
          <h2 onClick={() => handleClickLink("/login")}>Login</h2>
        )}
      </div>
      {location.pathname !== "/login" ? (
        <img
          onClick={() => setModalSearch(!showModalSearch)}
          className="header-icon"
          src={MagnifyingGlass}
          alt="Magnifyng Glass"
        />
      ) : null}

      {renderModalSearch()}
    </nav>
  );
};

export default Header;
