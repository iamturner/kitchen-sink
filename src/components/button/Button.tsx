import React from "react";
import PropTypes from "prop-types";
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
