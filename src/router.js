import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/loading";
import "./index.scss";

const Header = React.lazy(() => import("./components/header"));
const NotFound = React.lazy(() => import("./components/notFound"));
const Homepage = React.lazy(() => import("./view/homepage"));

const RouterApp = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Header />
        <div className="child">
          <Switch>
            <Route exact path="/" component={Homepage} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
};

export default RouterApp;
