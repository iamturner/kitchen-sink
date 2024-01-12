import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ButtonProps from "./button.types";

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

const StyledButton = styled.button<ButtonProps>(
  ({ variant = "primary" }) => css`
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

    &:active {
      background: ${variantColors[variant].active};
    }

    &:focus-visible {
      outline: solid 2px ${variantColors[variant].base};
      outline-offset: 2px;
    }

    &:hover {
      background: ${variantColors[variant].hover};
    }
  `,
);

export default StyledButton;
