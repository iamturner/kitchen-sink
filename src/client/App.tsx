import React from "react";
import { Routes, Route } from "react-router";
import { Notifications } from "./features";
import { SocketProvider } from "./socket";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/api",
  }),
  cache: new InMemoryCache(),
});

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
