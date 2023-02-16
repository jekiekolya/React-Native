import { createSlice } from "@reduxjs/toolkit";

import authOperations from "./authOperations";

const initialState = {
  user: { userId: null, userName: null },
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTRATION
      .addCase(authOperations.authRegister.pending, handlePending)
      .addCase(authOperations.authRegister.rejected, handleRejected)
      .addCase(authOperations.authRegister.fulfilled, (state, action) => {
        state.user.userId = action.payload.userId;
        state.user.userName = action.payload.userName;
        state.loading = false;
      })

      // LOGIN
      .addCase(authOperations.authLogin.pending, handlePending)
      .addCase(authOperations.authLogin.rejected, handleRejected)
      .addCase(authOperations.authLogin.fulfilled, (state, action) => {
        state.user.userId = action.payload.userId;
        state.user.userName = action.payload.userName;
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
