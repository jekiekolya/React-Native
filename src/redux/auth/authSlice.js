import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
