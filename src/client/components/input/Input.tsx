import React from "react";
import type InputProps from "./Input.types";
import StyledInput from "./input.styled";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    return <StyledInput {...props} ref={forwardedRef} />;
  },
);

Input.displayName = "Input";

export default Input;
