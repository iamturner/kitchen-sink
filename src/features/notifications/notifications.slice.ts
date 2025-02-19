import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type NotificationProps } from "./Notifications.types";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    value: [],
  },
  reducers: {
    create: (
      state: { value: NotificationProps[] },
      action: PayloadAction<NotificationProps>,
    ) => {
      const array = [].concat(action.payload);
      state.value.unshift(...array);
    },
    remove: (
      state: { value: NotificationProps[] },
      action: PayloadAction<number | string>,
    ) => {
      const index = state.value.findIndex(({ id }) => id === action.payload);
      state.value.splice(index, 1);
    },
  },
});

export const { actions } = notificationSlice;

export default notificationSlice.reducer;
