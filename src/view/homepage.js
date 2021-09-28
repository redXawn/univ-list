import React, { useEffect, useState, lazy, Suspense, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/loading";
import { getUniversities, incrementPagination } from "../redux/action/universitiesAction";
import infiniteScrolling from "../utils/infiniteScroll";
import { saveEmailSubscription, checkEmailSubscription, getAllUnivWithSubscription } from "../utils/indexDb";

import "./homepage.scss";

const Card = lazy(() => import("../components/card"));
const Button = lazy(() => import("../components/button"));
const Skeleton = lazy(() => import("../components/skeleton"));
const NotFound = lazy(() => import("../components/notFound"));
const Modal = lazy(() => import("../components/modal"));
const Input = lazy(() => import("../components/input"));
const HomeHeader = lazy(() => import("./homeHeader"));

const Homepage = (props) => {
  infiniteScrolling(getMoreUnivList);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer.loading);
  const universitiesReducer = useSelector((state) => state.universitiesReducer);
  const { univName, univCountry, universitiesList, paginationList, currentPage, totalPage } = universitiesReducer;

  const [showModalSubscribe, setShowModalSubscribe] = useState(false);
  const [univSubscribe, setUnivSubscribe] = useState({});
  const [emailSubscribe, setEmailSubscribe] = useState("andrew@gmail.com");
  const [emailExist, setEmailExist] = useState(false);
  const [univWithSubsription, setUnivWithSubscription] = useState([]);
  const [listEmailSubscribe, setListEmailSubscribe] = useState([]);
  const [showModalListEmail, setShowModalListEmail] = useState(false);

  useEffect(() => {
    if (universitiesList.length === 0) {
      dispatch(getUniversities(univName, univCountry));
    }
  }, []);

  useEffect(() => {
    getUnivSubscribe();
  }, []);

  useEffect(() => {
    if (emailExist) {
      setEmailExist(false);
    }
  }, [emailSubscribe]);

  function getMoreUnivList() {
    if (currentPage < totalPage) {
      dispatch(incrementPagination());
    }
  }

  async function getUnivSubscribe() {
    const getData = await getAllUnivWithSubscription();
    setUnivWithSubscription([...getData]);
  }

  function renderUnivCard() {
    if (paginationList.length > 0) {
      return paginationList.map((item, index) => (
        <Card customClassName="j-content--space-between" key={index}>
          <span className="homepage-card-index">{index + 1}</span>
          <div className="d--flex f-direction--column a-item--center">
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
          </div>
          {checkTotalSubscribtion(item.name)}
          <Button onClick={() => clickSubscribeCard(item)} customClassName="homepage-card-button">
            Subscribe
          </Button>
        </Card>
      ));
    } else if (paginationList.length === 0 && !loading) {
      return <NotFound text="No University Found" />;
    }
  }

  function clickSubscribeCard(data) {
    setUnivSubscribe(data);
    setShowModalSubscribe(true);
  }

  function checkTotalSubscribtion(name) {
    const check = univWithSubsription.find((data) => data.name === name);
    if (check && check.name) {
      return (
        <div className="w--100" onClick={() => openModalListEmail(check.emailSubscription)}>
          <label>Subscriber: {check.emailSubscription.length}</label>
        </div>
      );
    }
  }

  function openModalListEmail(listEmail) {
    setListEmailSubscribe(listEmail);
    setShowModalListEmail(true);
  }

  function renderSkeletonCard() {
    if (loading) {
      return (
        <Fragment>
          <Card customClassName="j-content--center">
            <Skeleton height={40} width={140} />
            <Skeleton height={25} width={150} />
            <Skeleton height={25} width={200} />
            <Skeleton height={25} width={200} />
          </Card>
          <Card customClassName="j-content--center">
            <Skeleton height={40} width={140} />
            <Skeleton height={25} width={150} />
            <Skeleton height={25} width={200} />
            <Skeleton height={25} width={200} />
          </Card>
          <Card customClassName="j-content--center">
            <Skeleton height={40} width={140} />
            <Skeleton height={25} width={150} />
            <Skeleton height={25} width={200} />
            <Skeleton height={25} width={200} />
          </Card>
        </Fragment>
      );
    }
  }

  function renderModalSubscribe() {
    return (
      <Modal show={showModalSubscribe} toggle={() => setShowModalSubscribe(false)}>
        <div className="w--80 margin-auto padding-10">
          <div className="margin-bottom-30">
            <Input
              label="Input Email"
              placeholder="Email"
              type="email"
              value={emailSubscribe}
              error={errorInputEmail()}
              onChange={(e) => setEmailSubscribe(e.target.value)}
            />
          </div>
          <Button
            disabled={!emailSubscribe || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailSubscribe) === false}
            onClick={submitSubscription}>
            Submit Subscribtion
          </Button>
        </div>
      </Modal>
    );
  }

  function errorInputEmail() {
    const checkEmailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailSubscribe);
    if (emailSubscribe && !checkEmailFormat) {
      return "Invalid Email Format";
    } else if (emailExist) {
      return "This Email Already Subscribe to This University";
    } else {
      return false;
    }
  }

  async function submitSubscription() {
    const checkEmail = await checkEmailSubscription(univSubscribe.name, emailSubscribe);
    if (!checkEmail) {
      await saveEmailSubscription(univSubscribe, emailSubscribe);
      setShowModalSubscribe(false);
      setEmailSubscribe("");
      setEmailExist(false);
      getUnivSubscribe();
    } else {
      setEmailExist(true);
    }
  }

  function renderModalListEmail() {
    return (
      <Modal show={showModalListEmail} toggle={() => setShowModalListEmail(false)}>
        <div className="w--4 margin-auto padding-10">
          {listEmailSubscribe.map((item, index) => (
            <div key={index} className="margin-10">
              <label className="margin-right-10">{index + 1}.</label>
              <label>{item.email}</label>
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <HomeHeader />
      <div className="homepage-card-wrapper">{renderUnivCard()}</div>
      <div className="homepage-card-wrapper">{renderSkeletonCard()}</div>
      {renderModalSubscribe()}
      {renderModalListEmail()}
    </Suspense>
  );
};

export default Homepage;
