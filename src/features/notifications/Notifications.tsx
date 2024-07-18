import React from "react";
import { useDispatch, useSelector } from "react-redux";
import notificationSlice from "./notification.slice";
import StyledNotifications from "./notifications.styled";
import { Button } from "../../components";

const { actions: notificationActions } = notificationSlice;

const Notifications = () => {
  const notifications = useSelector(
    (state: { notifications: { value: Array<string> } }) =>
      state.notifications.value,
  );

  const dispatch = useDispatch();

  return (
    <StyledNotifications>
      {notifications.map((notification, index) => (
        <li key={`notification-${index}`}>
          <span>{notification}</span>
          <Button
            onClick={() => dispatch(notificationActions.remove(index))}
            variant="text"
          >
            <svg
              height="16px"
              width="16px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <polygon
                    points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256"
                  />
                </g>
              </g>
            </svg>
          </Button>
        </li>
      ))}
    </StyledNotifications>
  );
};

export default Notifications;
