import React from "react";
import { Routes, Route } from "react-router";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { Notifications } from "./features";
import { SocketProvider } from "./socket";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Notifications />
        </SocketProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
