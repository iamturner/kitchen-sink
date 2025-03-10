import React, { useEffect } from "react";
import { type NotificationProps } from "./Notifications.types";
import StyledNotifications from "./notifications.styled";
import ListItem from "./components/ListItem";
import { useSocket } from "../../socket";
import useNotifications from "./useNotifications";

const Notifications = (props: React.HTMLAttributes<HTMLUListElement>) => {
  const { socket } = useSocket();

  const { fetch, notifications, received } = useNotifications();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (socket) {
      // listener for notify events from server
      socket.on("notify", (data: NotificationProps) => {
        received(data);
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
        <ListItem key={notification.id} {...notification} />
      ))}
    </StyledNotifications>
  );
};

export default Notifications;
