import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { matchers } from "@emotion/jest";
import Button from "./Button";

expect.extend(matchers);

describe("Component: Button", () => {
  test("It applies correct variant background", () => {
    render(
      <>
        <Button data-testid="primary" variant="primary" />
        <Button data-testid="secondary" variant="secondary" />
      </>,
    );
    expect(screen.getByTestId("primary")).toHaveStyleRule(
      "background",
      "mediumslateblue",
    );
    expect(screen.getByTestId("secondary")).toHaveStyleRule(
      "background",
      "darkseagreen",
    );
  });

  test("It calls onClick event callback", () => {
    // create mock click event callback
    const mockCallback = jest.fn();
    render(<Button onClick={mockCallback} />);

    fireEvent.click(screen.getByRole("button"));
    expect(mockCallback.mock.calls).toHaveLength(1);
  });
});
