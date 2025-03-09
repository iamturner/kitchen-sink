import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "./notifications.slice";
import { type NotificationProps } from "./Notifications.types";
import StyledNotifications from "./notifications.styled";
import Notification from "./components/Notification";
import { useSocket } from "../../socket";
import useNotifications from "./useNotifications";

const Notifications = (props: React.HTMLAttributes<HTMLUListElement>) => {
  const { socket } = useSocket();

  const dispatch = useDispatch();

  const { notifications, get } = useNotifications();

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (socket) {
      // listener for notify events from server
      socket.on("notify", (data: NotificationProps | NotificationProps[]) => {
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
