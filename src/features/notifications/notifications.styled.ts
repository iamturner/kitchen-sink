import styled from "@emotion/styled";
import { css } from "@emotion/react";

const StyledNotifications = styled.ul(
  () => css`
    list-style-type: none;
    margin: 0;
    padding: 16px;
    position: fixed;
    right: 0;
    top: 0;

    li {
      align-items: center;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      font-size: 0.9rem;
      gap: 1rem;
      margin: 8px;
      padding: 16px 16px 16px 20px;
      text-align: left;
    }
  `,
);

export default StyledNotifications;
