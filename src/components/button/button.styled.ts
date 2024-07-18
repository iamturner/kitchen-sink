import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ButtonProps from "./button.types";

const colorColors = {
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

const StyledButton = styled.button<ButtonProps>(
  ({ color = "primary", variant = "solid" }) => css`
    appearance: none;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 15px;
    margin: 4px;
    outline: none;
    padding: 12px 24px 14px;
    transition: background-color 200ms;

    svg {
      display: block;
      fill: currentColor;
    }

    ${variant === "solid" &&
    css`
      background: ${colorColors[color].base};
      color: white;

      &:focus-visible {
        outline: solid 2px ${colorColors[color].base};
        outline-offset: 2px;
      }

      &:hover {
        background: ${colorColors[color].hover};
      }

      &:active {
        background: ${colorColors[color].active};
      }
    `}

    ${variant === "text" &&
    css`
      background: transparent;
      color: ${colorColors[color].base};
      padding: 8px;

      &:focus-visible {
        outline: solid 2px ${colorColors[color].base};
        outline-offset: 2px;
      }

      &:hover {
        color: ${colorColors[color].hover};
      }

      &:active {
        color: ${colorColors[color].active};
      }
    `}
  `,
);

export default StyledButton;
