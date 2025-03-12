import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type NotificationProps } from "./Notifications.types";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    value: [] as NotificationProps[],
  },
  reducers: {
    init: (
      state: { value: NotificationProps[] },
      action: PayloadAction<NotificationProps | NotificationProps[]>,
    ) => {
      state.value = [].concat(action.payload);
    },
    add: (
      state: { value: NotificationProps[] },
      action: PayloadAction<NotificationProps | NotificationProps[]>,
    ) => {
      const array = [].concat(action.payload);
      state.value.unshift(...array);
    },
    remove: (
      state: { value: NotificationProps[] },
      action: PayloadAction<number | string>,
    ) => {
      const index = state.value.findIndex(({ id }) => id === action.payload);
      // remove notification if found
      if (index > -1) {
        state.value.splice(index, 1);
      }
    },
  },
});

export const { actions } = notificationSlice;

export default notificationSlice.reducer;
