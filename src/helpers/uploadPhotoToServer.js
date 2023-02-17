import uuid from "react-native-uuid";

// Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export default async function uploadPhotoToServer(postImage) {
  try {
    const res = await fetch(postImage);
    const file = await res.blob();

    const uniqueID = uuid.v4();
    const storageRef = ref(storage, `postImage/post_${uniqueID}`);

    await uploadBytes(storageRef, file);

    // get url
    const postImageUrl = await getDownloadURL(storageRef);

    return postImageUrl;
  } catch (error) {
    console.log(error.message);
  }
}
