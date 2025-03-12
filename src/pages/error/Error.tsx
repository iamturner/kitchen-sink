import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router";

const ErrorPage = () => (
  <>
    <Helmet>
      <title>404 | Error Page</title>
    </Helmet>
    <div className="wrapper">
      <h1>Page Not Found</h1>
      <NavLink to="/">Return to Home</NavLink>
    </div>
  </>
);

export default ErrorPage;
