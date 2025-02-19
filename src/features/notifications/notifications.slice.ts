import { createSlice } from "@reduxjs/toolkit";
import { type NotificationProps } from "./Notifications.types";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    value: [],
  },
  reducers: {
    create: (state: { value: NotificationProps[] }, action) => {
      const array = [].concat(action.payload);
      state.value.unshift(...array);
    },
    remove: (state: { value: NotificationProps[] }, action) => {
      const index = state.value.findIndex(({ id }) => id === action.payload);
      state.value.splice(index, 1);
    },
  },
});

export default notificationSlice;
