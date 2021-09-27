import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/loading";
import infiniteScrolling from "../utils/infiniteScroll";
import { getUniversities, incrementPagination } from "../redux/action/universitiesAction";

const Card = lazy(() => import("../components/card"));

const Homepage = (props) => {
  infiniteScrolling(getMoreUnivList);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer);
  const universitiesReducer = useSelector((state) => state.universitiesReducer);
  const { universitiesList, paginationList, currentPage, totalPage } = universitiesReducer;

  useEffect(() => {
    if (universitiesList.length === 0) {
      dispatch(getUniversities());
    }
  }, []);

  function renderUnivCard() {
    if (paginationList.length > 0) {
      return paginationList.map((item, index) => (
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

  function getMoreUnivList() {
    if (currentPage < totalPage) {
      dispatch(incrementPagination());
    }
  }

  return <Suspense fallback={<Loading />}>{renderUnivCard()}</Suspense>;
};

export default Homepage;
