import React from "react";
import PropTypes, { InferProps } from "prop-types";
import StyledButton from "./button.styled";

function Button({
  children,
  variant,
  ...rest
}: InferProps<typeof Button.propTypes> &
  // allow all valid HTML attributes for a `button` element as props, (useful for spreading)
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // spread `rest` on to `button` elemene
  return (
    <StyledButton {...rest} variant={variant}>
      {children}
    </StyledButton>
  );
}

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

export default Button;
