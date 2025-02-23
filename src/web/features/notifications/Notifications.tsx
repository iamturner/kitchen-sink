import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./notifications.slice";
import { type NotificationProps } from "./Notifications.types";
import StyledNotifications from "./notifications.styled";
import Notification from "./components/Notification";
import { useSocket } from "../../socket";

const Notifications = (props: React.HTMLAttributes<HTMLUListElement>) => {
  const { socket } = useSocket();

  const notifications = useSelector(
    (state: {
      notifications: {
        value: NotificationProps[];
      };
    }) => state.notifications.value,
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
        dispatch(actions.add(json.data));
      } catch (error) {
        // error handling
      } finally {
        // done
      }
    };
    // call fetcher
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      // listener for notify events from server
      socket.on("notify", (data) => {
        dispatch(actions.add(data));
      });
      // remove listener on unmount
      return () => {
        socket.off("notify");
      };
    }
  }, [socket.connected]);

  return (
    <StyledNotifications {...props}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </StyledNotifications>
  );
};

export default Notifications;
