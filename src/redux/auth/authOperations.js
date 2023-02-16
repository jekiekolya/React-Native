import { createAsyncThunk } from "@reduxjs/toolkit";

// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";

// Actions
import { authAction } from "./authSlice";

const authRegister = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      // Create user
      await createUserWithEmailAndPassword(auth, email, password);

      // Add user data
      await updateProfile(auth.currentUser, {
        displayName: name,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      // Get updated user
      const user = auth.currentUser;

      // Create payload
      const payload = {
        userId: user?.uid,
        userName: user?.displayName,
      };

      return payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      // Create payload
      const payload = {
        userId: user?.user?.uid,
        userName: user?.user?.displayName,
      };

      return payload;
    } catch (error) {
      console.log("error.message", error.message);
      // return rejectWithValue(error.message);
    }
  }
);

// const authLogout = () => async (dispatch, getState) => {};

const authLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await signOut(auth);

      console.log(res);
    } catch (error) {
      console.log("error.message", error.message);
      // return rejectWithValue(error.message);
    }
  }
);

const authStateChangeUser = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          userId: user?.uid,
          userName: user?.displayName,
          isAuth: true,
        };

        dispatch(authAction(payload));
      } else {
        const payload = {
          userId: null,
          userName: null,
          isAuth: false,
        };

        dispatch(authAction(payload));
      }
    });
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const authOperations = {
  authRegister,
  authLogin,
  authLogout,
  authStateChangeUser,
};

export default authOperations;
