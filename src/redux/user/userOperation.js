// Firebase
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";

// Actions
import { authAction } from "../auth/authSlice";

// API
import uploadUserAvatarToServer from "../../api/uploadUserAvatarToServer";

// UPDATE USER AVATAR
const updateUserAvatar = (image) => async (dispatch, getState) => {
  try {
    // Upload photo to server
    const imageUrl = await uploadUserAvatarToServer(image);

    // Update user profile
    await updateProfile(auth.currentUser, { photoURL: imageUrl });

    // Create payload
    const user = getState().auth.user;
    const payload = { ...user, userAvatar: imageUrl };

    // Update state
    dispatch(authAction.updateUserProfile(payload));
  } catch (error) {
    console.log("error.message", error.message);
  }
};

const userOperations = {
  updateUserAvatar,
};

export default userOperations;
