import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./features/notifications";

export default configureStore({
  reducer: {
    notifications: reducer,
  },
});
