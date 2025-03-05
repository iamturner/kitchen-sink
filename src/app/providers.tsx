import React from "react";
import { ApolloProvider } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { SocketProvider } from "./socket";
import client from "./apollo-client";
import store from "./store";

interface ProvidersProps {
  children?: React.ReactNode;
  /** mocks for Apollo Server */
  mocks?: MockedResponse<object, object>[];
}

const IS_TEST_ENV =
  typeof process !== "undefined" && process?.env?.NODE_ENV === "test";

const Providers = ({ children, mocks }: ProvidersProps) => {
  return (
    <>
      <Provider store={store}>
        <SocketProvider>
          {IS_TEST_ENV && (
            <MockedProvider mocks={mocks} addTypename={false}>
              {children}
            </MockedProvider>
          )}
          {!IS_TEST_ENV && (
            <ApolloProvider client={client}>{children}</ApolloProvider>
          )}
        </SocketProvider>
      </Provider>
    </>
  );
};

export default Providers;
