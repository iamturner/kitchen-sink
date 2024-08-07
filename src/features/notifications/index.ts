import Notifications from "./Notifications";
import notificationSlice from "./notification.slice";

const { actions: notificationActions, reducer: notificationReducer } =
  notificationSlice;

export { Notifications, notificationActions, notificationReducer };
