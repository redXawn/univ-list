import React, { useEffect, lazy, Suspense, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/loading";
// import Skeleton from "../components/skeleton";

import infiniteScrolling from "../utils/infiniteScroll";
import { getUniversities, incrementPagination } from "../redux/action/universitiesAction";

import "./homepage.scss";

const Card = lazy(() => import("../components/card"));
const Skeleton = lazy(() => import("../components/skeleton"));

const Homepage = (props) => {
  infiniteScrolling(getMoreUnivList);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer.loading);
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
    }
  }

  function renderSkeletonCard() {
    if (loading) {
      return (
        <Fragment>
          <Card customClassName="j-content--center">
            <Skeleton height={40} width={140} />
            <Skeleton height={25} width={150} />
            <Skeleton height={25} width={200} />
          </Card>
          <Card customClassName="j-content--center">
            <Skeleton height={40} width={140} />
            <Skeleton height={25} width={150} />
            <Skeleton height={25} width={200} />
          </Card>
          <Card customClassName="j-content--center">
            <Skeleton height={40} width={140} />
            <Skeleton height={25} width={150} />
            <Skeleton height={25} width={200} />
          </Card>
        </Fragment>
      );
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
      <div className="homepage-card-wrapper">{renderSkeletonCard()}</div>
    </Suspense>
  );
};

export default Homepage;
