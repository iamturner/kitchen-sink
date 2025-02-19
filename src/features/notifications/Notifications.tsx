import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./notifications.slice";
import { type NotificationProps } from "./Notifications.types";
import StyledNotifications from "./notifications.styled";
import Notification from "./components/Notification";

const Notifications = (props: React.HTMLAttributes<HTMLUListElement>) => {
  const notifications = useSelector(
    (state: { notifications: { value: NotificationProps[] } }) =>
      state.notifications.value,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch notifications from server
    const fetchData = async () => {
      try {
        // fetch from local Express server
        const response = await fetch("/api/notifications");
        // check for OK response
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        // get JSON from response
        const json = await response.json();
        // dispatch notifications
        dispatch(actions.create(json.data));
      } catch (error) {
        // error handling
      } finally {
        // done
      }
    };
    fetchData();
  }, []);

  return (
    <StyledNotifications {...props}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </StyledNotifications>
  );
};

export default Notifications;
