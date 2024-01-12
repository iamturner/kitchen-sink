import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { forceState } from "../../../playwright/functions";
import Button from "./Button";

test("Button - variant", async ({ mount }) => {
  const tree = await mount(
    <div
      style={{
        display: "inline-grid",
        gap: 16,
        gridTemplateColumns: "repeat(4, auto)",
        padding: 16,
      }}
    >
      <Button variant="primary">My Button</Button>
      <Button variant="primary">My Button</Button>
      <Button variant="primary">My Button</Button>
      <Button variant="primary">My Button</Button>

      <Button variant="secondary">My Button</Button>
      <Button variant="secondary">My Button</Button>
      <Button variant="secondary">My Button</Button>
      <Button variant="secondary">My Button</Button>
    </div>,
  );

  await forceState(tree, "button:nth-child(4n + 2)", "hover");
  await forceState(tree, "button:nth-child(4n + 3)", "focus-visible");
  await forceState(tree, "button:nth-child(4n + 4)", "active");

  await expect(tree).toHaveScreenshot();
});
