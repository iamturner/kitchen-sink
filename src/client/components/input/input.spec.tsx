import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { forceState } from "../../../../playwright/functions";
import Input from "./Input";

test("Input", async ({ mount }) => {
  const tree = await mount(
    <div
      style={{
        display: "inline-grid",
        gap: 16,
        gridTemplateColumns: "repeat(4, auto)",
        padding: 16,
      }}
    >
      <Input type="text" />
    </div>,
  );

  await forceState(tree, "input:nth-child(4n + 2)", "hover");
  await forceState(tree, "input:nth-child(4n + 3)", "focus-visible");
  await forceState(tree, "input:nth-child(4n + 4)", "active");

  await expect(tree).toHaveScreenshot();
});
