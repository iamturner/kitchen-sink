import { configureStore } from "@reduxjs/toolkit";
import { notificationReducer } from "./features";

export default configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});
