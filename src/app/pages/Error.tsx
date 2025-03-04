import React from "react";
import { NavLink } from "react-router";

const ErrorPage = () => {
  return (
    <div className="wrapper">
      <h1>Page Not Found</h1>
      <NavLink to="/">Return to Home</NavLink>
    </div>
  );
};

export default ErrorPage;
