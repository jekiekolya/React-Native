// Firebase
import { getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export default async function uploadPostToServer(postData) {
  try {
    // Create post
    const post = {
      title: "PostTitle",
      imageUrl:
        "https://img.itinari.com/countries/ua-ukraine.jpg?ch=DPR&dpr=2.625&w=1600&s=76b48d9430a1bdc555274df0fa944579",
      countLikes: 0,
      location: "Ukraine",
      comments: [],
      ...postData,
    };

    // Add post to firestore
    const docRef = await addDoc(collection(db, "posts"), {
      ...post,
    });
    const docSnap = await getDoc(docRef);

    return { ...docSnap?.data(), id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return;
}
