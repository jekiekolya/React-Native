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

// REGISTRATION
const authRegister =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
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

      dispatch(authAction.updateUserProfile(payload));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

// LOGIN
const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      // Create payload
      const payload = {
        userId: user?.user?.uid,
        userName: user?.user?.displayName,
      };

      dispatch(authAction.updateUserProfile(payload));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

// LOGOUT
const authLogout = () => async (dispatch, getState) => {
  try {
    await signOut(auth);

    dispatch(authAction.authStateChange(false));
  } catch (error) {
    console.log("error.message", error.message);
  }
};

// CHANGE USER AUTH STATE
const authStateChangeUser = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          userId: user?.uid,
          userName: user?.displayName,
        };

        dispatch(authAction.updateUserProfile(payload));
        dispatch(authAction.authStateChange(true));
      } else {
        const payload = {
          userId: null,
          userName: null,
        };

        dispatch(authAction.updateUserProfile(payload));
        dispatch(authAction.authStateChange(false));
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};

const authOperations = {
  authRegister,
  authLogin,
  authLogout,
  authStateChangeUser,
};

export default authOperations;
