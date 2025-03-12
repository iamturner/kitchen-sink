import React from "react";
import { renderWithProviders } from "../../utils/test.utils";
import HomePage from "./Home";

describe("Page: Home", () => {
  test("It renders without error", () => {
    expect(renderWithProviders(<HomePage />));
  });
});
