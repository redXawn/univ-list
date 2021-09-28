import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/loading";
import infiniteScrolling from "../utils/infiniteScroll";
import { getUniversities, incrementPagination } from "../redux/action/universitiesAction";

import "./homepage.scss";

const Card = lazy(() => import("../components/card"));

const Homepage = (props) => {
  infiniteScrolling(getMoreUnivList);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer);
  const universitiesReducer = useSelector((state) => state.universitiesReducer);
  const { univName, univCountry, universitiesList, paginationList, currentPage, totalPage } = universitiesReducer;

  useEffect(() => {
    if (universitiesList.length === 0) {
      dispatch(getUniversities(univName, univCountry));
    }
  }, []);

  function renderUnivCard() {
    if (paginationList.length > 0) {
      return paginationList.map((item, index) => (
        <Card customClassName="j-content--center" key={index}>
          <span className="homepage-card-index">{index + 1}</span>
          <div className="homepage-card-country margin-bottom-10">
            <label className="margin-right-5">{item.country}</label>
            <span>
              <img src={`https://www.countryflags.io/${item.alpha_two_code}/shiny/32.png`} />
            </span>
          </div>
          <label className="margin-bottom-10">{item.name}</label>
          <a className="homepage-card-link" href={item.web_pages} target="_blank">
            {item.web_pages}
          </a>
        </Card>
      ));
    } else {
      return <div>empty</div>;
    }
  }

  function getMoreUnivList() {
    if (currentPage < totalPage) {
      dispatch(incrementPagination());
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="homepage-univ-info">
        <label>Name: {univName}</label>
        <label>Country: {univCountry}</label>
      </div>
      <div className="homepage-card-wrapper">{renderUnivCard()}</div>
    </Suspense>
  );
};

export default Homepage;
