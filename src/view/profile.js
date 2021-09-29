import React, { useEffect, lazy, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/loading";
import { setListFavorite, resetUser } from "../redux/action/userAction";
import { getUserListFavorite } from "../utils/indexDb";

import "./profile.scss";

const Button = lazy(() => import("../components/button"));

const LoginRegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { email, listFavorite } = userReducer;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.replace("/login");
    }
  }, []);

  useEffect(() => {
    if (email && listFavorite.length === 0) {
      getListFavorite();
    }
  }, [email]);

  async function getListFavorite() {
    const listUserFavorite = await getUserListFavorite(email);
    dispatch(setListFavorite(listUserFavorite));
  }

  function renderListFavorite() {
    return (
      listFavorite.length > 0 &&
      listFavorite.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
        </tr>
      ))
    );
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch(resetUser());
    history.replace("/login");
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="profile-container">
        <div className="margin-bottom-30 d--flex j-content--space-between">
          <h3>Email: {email}</h3>
          <Button onClick={logout} customClassName="profile-button-logout">
            Logout
          </Button>
        </div>
        <div className="d--flex f-direction--column a-item--center">
          <h4 className="margin-bottom-20">List Favorite Univ</h4>
          <div>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{renderListFavorite()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginRegisterPage;
