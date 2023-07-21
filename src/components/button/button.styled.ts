import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type StyledButtonTypes = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
};

const variantColors = {
  primary: {
    base: "mediumslateblue",
    hover: "slateblue",
    active: "darkslateblue",
  },
  secondary: {
    base: "darkseagreen",
    hover: "mediumseagreen",
    active: "seagreen",
  },
};

const StyledButton = styled("button")(
  ({ variant = "primary" }: StyledButtonTypes) =>
    css`
      appearance: none;
      background: ${variantColors[variant].base};
      border: none;
      border-radius: 12px;
      color: white;
      cursor: pointer;
      font-size: 15px;
      margin: 4px;
      outline: none;
      padding: 12px 24px 14px;
      transition: background-color 200ms;

      &:hover {
        background: ${variantColors[variant].hover};
      }

      &:active {
        background: ${variantColors[variant].active};
      }

      &:focus-visible {
        outline: solid 2px ${variantColors[variant].base};
        outline-offset: 2px;
      }
    `
);

export default StyledButton;
