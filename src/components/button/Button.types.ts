import React from "react";

export default interface ButtonProps
  /** allow all valid HTML attributes for a `button` element as props */
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content of the Button */
  children?: React.ReactNode;
  /** Color of the Button */
  color?: "primary" | "secondary";
  /** Color of the Button */
  variant?: "solid" | "text";
}
