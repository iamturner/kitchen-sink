import React from "react";
import { render } from "@testing-library/react";
import { matchers } from "@emotion/jest";
import Input from "./Input";

expect.extend(matchers);

describe("Component: Input", () => {
  test("Renders without errors", () => {
    expect(render(<Input data-testid="primary" color="primary" />));
  });
});
