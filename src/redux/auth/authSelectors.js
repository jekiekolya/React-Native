import { createAsyncThunk } from "@reduxjs/toolkit";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const authRegister = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      console.log(user);
    } catch (error) {
      console.log("error.message", error.message);
      // return rejectWithValue(error.message);
    }
  }
);

const authLogin = () => async (dispatch, getState) => {};
const authLogout = () => async (dispatch, getState) => {};

const authOperations = {
  authRegister,
  authLogin,
  authLogout,
};

export default authOperations;
