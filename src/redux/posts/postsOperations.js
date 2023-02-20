// Firebase
import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../firebase/config";

// Actions
import { postsAction } from "./postsSlice";

// GET ALL POSTS
const getAllPosts = () => async (dispatch, getState) => {
  try {
    // get all posts
    const posts = await getDocs(collection(db, "posts"));
    // console.log("posts", posts.docs[0].ref);
    // const comments = await getDocs(collection(posts.docs[0].ref, "comments"));
    // console.log(
    //   "comments",
    //   comments.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    // );

    // add id to collection and count comments
    const newPosts = posts.docs.map(async (doc) => {
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );

      const countComments = snapshotComments.data().count;

      return { ...doc.data(), id: doc.id, countComments };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
    console.log("error.message", error.message);
  }
};

const getOwnPosts = () => async (dispatch, getState) => {
  try {
    // Get data from state
    const { userId } = getState().auth.user;
    // get own posts
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const posts = await getDocs(q);

    // add id to collection and count comments
    const newPosts = posts.docs.map(async (doc) => {
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );

      const countComments = snapshotComments.data().count;

      return { ...doc.data(), id: doc.id, countComments };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updateOwnPosts(payload));
  } catch (error) {
    console.log("error.message", error.message);
  }
};

// ADD POST
const addPost = (postData) => async (dispatch, getState) => {
  try {
    // Create post
    const post = {
      title: "PostTitle",
      imageUrl:
        "https://img.itinari.com/countries/ua-ukraine.jpg?ch=DPR&dpr=2.625&w=1600&s=76b48d9430a1bdc555274df0fa944579",
      countLikes: 0,
      location: "Ukraine",
      // comments: [],
      ...postData,
    };

    // Add post to firestore
    await addDoc(collection(db, "posts"), {
      ...post,
    });

    // get all posts
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (error) {
    console.log("error.message", error.message);
  }
};

// GET ALL COMMENTS BY POST ID
const getAllCommentsByPostId = (postId) => async (dispatch, getState) => {
  try {
    // Get ref to post
    const docRef = doc(db, "posts", postId);

    // Get all comments
    const comments = await getDocs(collection(docRef, "comments"));

    // Add id to collection
    const payload = comments.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    dispatch(postsAction.updateCommentsToPost(payload));
  } catch (error) {
    console.log("error.message", error.message);
  }
};

// ADD COMMENT TO POST
const addCommentByPostID =
  (postId, commentData) => async (dispatch, getState) => {
    try {
      // Get data from state
      const { userName, userId, userAvatar } = getState().auth.user;

      // Create comment
      const comment = {
        comment: commentData,
        authorName: userName,
        authorId: userId,
        authorAvatar: userAvatar,
        date: Date.now(),
        postId: postId,
      };

      // Get ref to post by postId
      const docRef = doc(db, "posts", postId);

      // Add comment to collection
      await addDoc(collection(docRef, "comments"), { ...comment });

      // Update state
      dispatch(getAllCommentsByPostId(postId));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

const postsOperations = {
  getAllPosts,
  getOwnPosts,
  addPost,
  getAllCommentsByPostId,
  addCommentByPostID,
};

export default postsOperations;
