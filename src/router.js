import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/loading";

const Header = React.lazy(() => import("./components/header"));
const NotFound = React.lazy(() => import("./components/notFound"));
const Homepage = React.lazy(() => import("./view/homepage"));
const LoginRegister = React.lazy(() => import("./view/loginRegister"));
const Profile = React.lazy(() => import("./view/profile"));

const RouterApp = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Header />
        <div className="child">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={LoginRegister} />
            <Route exact path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
};

export default RouterApp;
