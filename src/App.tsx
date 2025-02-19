import React from "react";
import { Routes, Route } from "react-router";
import { Notifications } from "./features";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Notifications />
    </>
  );
};

export default App;
