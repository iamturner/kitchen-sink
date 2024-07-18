import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    value: [],
  },
  reducers: {
    create: (state: { value: Array<string> }, action) => {
      state.value.unshift(action.payload);
    },
    remove: (state: { value: Array<string> }, action) => {
      state.value.splice(action.payload, 1);
    },
  },
});

export default notificationSlice;
