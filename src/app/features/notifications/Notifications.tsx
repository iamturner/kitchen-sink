import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import { actions } from "./notifications.slice";
import { type NotificationProps } from "./Notifications.types";
import StyledNotifications from "./notifications.styled";
import Notification from "./components/Notification";
import { useSocket } from "../../socket";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      message
    }
  }
`;

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

  const { data } = useQuery(GET_NOTIFICATIONS);

  useEffect(() => {
    if (data) {
      // dispatch notifications
      dispatch(actions.add(data.notifications));
    }
  }, [data, dispatch]);

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
