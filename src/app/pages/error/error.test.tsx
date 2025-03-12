import React from "react";
import { renderWithProviders } from "../../utils/test.utils";
import ErrorPage from "./Error";

describe("Page: Error", () => {
  test("It renders without error", () => {
    expect(renderWithProviders(<ErrorPage />));
  });
});
