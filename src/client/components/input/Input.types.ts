import React from "react";

export default interface InputProps
  /** allow all valid HTML attributes for an `input` element as props */
  extends React.InputHTMLAttributes<HTMLInputElement> {}
