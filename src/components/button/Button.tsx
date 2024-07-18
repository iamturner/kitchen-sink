import React from "react";
import ButtonProps from "./button.types";
import StyledButton from "./button.styled";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, forwardedRef) => {
    return (
      <StyledButton {...rest} ref={forwardedRef}>
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
