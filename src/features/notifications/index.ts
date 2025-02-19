import Notifications from "./Notifications";
import notificationSlice from "./notifications.slice";

const { actions: notificationActions, reducer: notificationReducer } =
  notificationSlice;

export { Notifications, notificationActions, notificationReducer };
