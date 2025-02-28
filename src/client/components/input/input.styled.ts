import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledInput = styled.input(
  () => css`
    appearance: none;
    background: white;
    border: solid 2px #d3d6d9;
    border-radius: 12px;
    color: #333;
    font-size: 15px;
    margin: 4px;
    outline: none;
    padding: 12px 16px;

    & + button {
      margin-top: 16px;
    }
  `,
);

export default StyledInput;
