import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./notifications.slice";
import { type NotificationProps } from "./Notifications.types";
import { CreateNotification, GetNotifications } from "./notifications.queries";
import { useSocket } from "../../socket";

const useNotifications = () => {
  const { socket } = useSocket();

  const dispatch = useDispatch();

  const [create] = useMutation(CreateNotification, {
    context: {
      headers: {
        "Content-Type": "application/json",
        // include socket.io ID in headers
        "X-Socket-ID": socket.id,
      },
    },
  });

  const [fetch] = useLazyQuery(GetNotifications, {
    onCompleted: (data) => {
      if (data) {
        // dispatch notifications
        dispatch(actions.add(data.notifications));
      }
    },
  });

  const notifications = useSelector(
    (state: {
      notifications: {
        value: NotificationProps[];
      };
    }) => state.notifications.value,
  );

  const send = async (message: string) => {
    // generate a random notification ID
    const id = Math.random().toString(36).slice(2);
    // post to local Apollo server
    try {
      await create({
        variables: { id, message },
      });
    } catch (error) {
      // handle error
    }
  };

  const set = async (notification: NotificationProps | NotificationProps[]) => {
    dispatch(actions.add(notification));
  };

  return { notifications, fetch, send, set };
};

export default useNotifications;
