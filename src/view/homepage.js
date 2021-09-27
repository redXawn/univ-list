import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/loading";
import { getUniversities } from "../redux/action/universitiesAction";

const Card = lazy(() => import("../components/card"));

const Homepage = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer);
  const universitiesList = useSelector((state) => state.universitiesReducer.universities);

  useEffect(() => {
    if (universitiesList.length === 0) {
      dispatch(getUniversities());
    }
  }, []);

  function renderUnivCard() {
    if (universitiesList.length > 0) {
      return universitiesList.map((item, index) => (
        <Card key={index}>
          <label>{item.name}</label>
          <label>{item.country}</label>
          <a href={item.web_pages} target="_blank">
            {item.web_pages}
          </a>
        </Card>
      ));
    } else {
      return <div>empty</div>;
    }
  }

  return <Suspense fallback={<Loading />}>{renderUnivCard()}</Suspense>;
};

export default Homepage;
