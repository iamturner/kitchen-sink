import React from "react";
import PropTypes from "prop-types";
import ButtonProps from "./Button.types";
import StyledButton from "./button.styled";

type ForwardedRef = HTMLButtonElement;

const Button = React.forwardRef<ForwardedRef, ButtonProps>(
  ({ children, variant, ...rest }, forwardedRef) => {
    return (
      <StyledButton {...rest} ref={forwardedRef} variant={variant}>
        {children}
      </StyledButton>
    );
  }
);

Button.propTypes = {
  /** Content of the Button */
  children: PropTypes.node,
  /** Color variant of the Button */
  variant: PropTypes.oneOf(["primary", "secondary"] as const).isRequired,
};

Button.defaultProps = {
  children: <></>,
  variant: "primary",
};

Button.displayName = "Button";

export default Button;
