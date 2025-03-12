import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Providers from "../providers";

const renderWithProviders = (ui: React.ReactElement, options: object = {}) =>
  render(
    <BrowserRouter>
      <Providers {...options}>{ui}</Providers>
    </BrowserRouter>,
  );

export { renderWithProviders };
