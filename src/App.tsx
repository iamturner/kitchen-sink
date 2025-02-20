import React from "react";
import { Routes, Route } from "react-router";
import { Notifications } from "./features";
import { SocketProvider } from "./socket";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";

const App = () => {
  return (
    <>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Notifications />
      </SocketProvider>
    </>
  );
};

export default App;
