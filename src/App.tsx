import React from "react";
import { Routes, Route } from "react-router";
import { Notifications } from "./features";
import Providers from "./providers";
import { HomePage, ErrorPage } from "./pages";

const App = () => (
  <Providers>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Notifications />
  </Providers>
);

export default App;
