import uuid from "react-native-uuid";

// Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export default async function uploadUserAvatarToServer(userAvatar) {
  try {
    const res = await fetch(userAvatar);
    const file = await res.blob();

    const uniqueID = uuid.v4();
    const storageRef = ref(storage, `userAvatar/avatar_${uniqueID}`);

    await uploadBytes(storageRef, file);

    // get url
    const userAvatarUrl = await getDownloadURL(storageRef);

    return userAvatarUrl;
  } catch (error) {
    alert(error.message);
  }
}
