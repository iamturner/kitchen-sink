import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type ButtonProps from "./Button.types";

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
    padding: 14px 24px;
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

      &:hover:enabled {
        background: ${colorColors[color].hover};
      }

      &:active:enabled {
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

      &:hover:enabled {
        color: ${colorColors[color].hover};
      }

      &:active:enabled {
        color: ${colorColors[color].active};
      }
    `}

    &:disabled {
      cursor: default;
      opacity: 0.6;
    }
  `,
);

export default StyledButton;
