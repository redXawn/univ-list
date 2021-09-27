import React, { useEffect, lazy, Suspense } from "react";

const Card = lazy(() => import("../components/card"));

const Homepage = (props) => {
  return (
    <div>
      <Card>asd</Card>
    </div>
  );
};

export default Homepage;
