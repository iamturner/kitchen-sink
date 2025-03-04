import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const animateInOut = keyframes`
  from {
    transform: translateX(calc(100% + 28px));
  }
  to {
    transform: translateX(0);
  }
`;

const StyledNotifications = styled.ul(
  () => css`
    list-style-type: none;
    margin: 0;
    max-height: calc(100% - 32px);
    overflow: scroll;
    padding: 16px;
    position: fixed;
    right: 0;
    top: 0;

    li {
      align-items: center;
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(6px);
      border-radius: 8px;
      box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.1);
      display: flex;
      font-size: 0.9rem;
      gap: 1rem;
      justify-content: space-between;
      margin: 12px;
      padding: 16px 16px 16px 20px;
      text-align: left;

      &[data-animation-state="entering"] {
        animation: ${animateInOut} 300ms;
      }

      &[data-animation-state="exiting"],
      &[data-animation-state="exited"] {
        animation: ${animateInOut} 300ms forwards reverse;
      }

      time {
        display: block;
        font-size: 75%;
        margin: 0.375rem 0 0 0;
        opacity: 0.6;
      }
    }

    @media (prefers-color-scheme: dark) {
      li {
        background: rgba(32, 32, 32, 0.75);
      }
    }
  `,
);

export default StyledNotifications;
