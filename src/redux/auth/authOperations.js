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

// API
import uploadUserAvatarToServer from "../../api/uploadUserAvatarToServer";

// REGISTRATION
const authRegister =
  ({ name, email, password, image }) =>
  async (dispatch, getState) => {
    try {
      // Create user
      await createUserWithEmailAndPassword(auth, email, password);

      // Upload photo to server
      const imageUrl = await uploadUserAvatarToServer(image);

      // Add user data
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageUrl,
      });
      // Get updated user
      const user = auth.currentUser;
      console.log("user", user);

      // Create payload
      const payload = {
        userId: user?.uid,
        userName: user?.displayName,
        userAvatar: user?.photoURL,
        userEmail: user?.email,
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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Create payload
      const payload = {
        userId: user?.uid,
        userName: user?.displayName,
        userAvatar: user?.photoURL,
        userEmail: user?.email,
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
          userAvatar: user?.photoURL,
          userEmail: user?.email,
        };

        dispatch(authAction.updateUserProfile(payload));
        dispatch(authAction.authStateChange(true));
      } else {
        const payload = {
          userId: null,
          userName: null,
          userAvatar: null,
          userEmail: null,
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
