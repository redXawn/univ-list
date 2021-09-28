import React, { useEffect, useState, lazy, Suspense, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { sortData } from "../redux/action/universitiesAction";

const Button = lazy(() => import("../components/button"));

const HomeHeader = () => {
  const dispatch = useDispatch();

  const universitiesReducer = useSelector((state) => state.universitiesReducer);
  const { univName, univCountry, paginationList, sortBy } = universitiesReducer;
  function renderSortButton() {
    if (paginationList.length !== 0) {
      const buttonList = [
        { text: "Name", key: "name" },
        { text: "Country", key: "country" },
      ];
      return (
        <Fragment>
          <h4>Sort By: {sortBy}</h4>
          <div className="d--flex j-content--center">
            {buttonList.map((item, index) => (
              <Button
                key={index}
                customClassName="homeheader-sort-button"
                disabled={item.key === sortBy}
                onClick={() => sortDataUniv(item.text, item.key)}>
                {item.text}
              </Button>
            ))}
          </div>
        </Fragment>
      );
    }
  }

  function sortDataUniv(sortText, sortKey) {
    dispatch(sortData(sortKey));
  }

  return (
    <div className="homeheader-wrapper">
      <div className="homeheader-search">
        <h4>Search Parameter:</h4>
        <div className="homeheader-search-label">
          <label>Name: {univName}</label>
          <label>Country: {univCountry}</label>
        </div>
      </div>
      <div className="homeheader-sort">{renderSortButton()}</div>
    </div>
  );
};

export default HomeHeader;
