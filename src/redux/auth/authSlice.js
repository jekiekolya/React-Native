import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { userId: null, userName: null },
  isAuth: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      isAuth: payload,
    }),
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
