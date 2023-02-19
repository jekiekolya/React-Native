// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

// Actions
import { postsAction } from "./postsSlice";

// GET ALL POSTS
const getAllPosts = () => async (dispatch, getState) => {
  try {
    // get all posts
    const posts = await getDocs(collection(db, "posts"));

    // add id to collection
    const payload = posts.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
    console.log("error.message", error.message);
  }
};

const postsOperations = {
  getAllPosts,
};

export default postsOperations;
