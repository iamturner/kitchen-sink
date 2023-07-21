import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { matchers } from "@emotion/jest";
import sinon from "sinon";
import Button from "./Button";

expect.extend(matchers);

describe("Component: Button", () => {
  test("It renders without errors", () => {
    expect(render(<Button />));
  });

  test("It applies secondary variant background", () => {
    render(<Button variant="secondary" />);

    expect(screen.getByRole("button")).toHaveStyleRule(
      "background",
      "darkseagreen"
    );
  });

  test("It calls onClick event", () => {
    const onClickSpy = sinon.spy();
    render(<Button onClick={onClickSpy} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onClickSpy.called).toBe(true);
  });
});
