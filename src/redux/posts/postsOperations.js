// Firebase
import {
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  getCountFromServer,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

// Actions
import { postsAction } from "./postsSlice";

// helpers
import getFormatDataForComment from "../../helpers/getFormatDataForComment";

// GET ALL POSTS
const getAllPosts = () => async (dispatch, getState) => {
  try {
    // Get data from state
    const { userId } = getState().auth.user;

    // get all posts
    const posts = await getDocs(collection(db, "posts"));

    // add id to collection and count comments
    const newPosts = posts.docs.map(async (doc) => {
      // Get comments count
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );
      const countComments = snapshotComments.data().count;

      // Get likes count
      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );
      const countLikes = snapshotLikes.data().count;

      // Post is Liked
      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );
      const likes = await getDocs(q);

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
    alert(error.message);
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
      // Get comments count
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );
      const countComments = snapshotComments.data().count;

      // Get likes count
      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );
      const countLikes = snapshotLikes.data().count;

      // Post is Liked
      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );
      const likes = await getDocs(q);

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updateOwnPosts(payload));
  } catch (error) {
    alert(error.message);
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
      location: "Ukraine",
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
    alert(error.message);
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
    const payload = comments.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: getFormatDataForComment(doc.data().date),
    }));

    dispatch(postsAction.updateCommentsToPost(payload));
  } catch (error) {
    alert(error.message);
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
      alert(error.message);
    }
  };

// ADD LIKE TO POST
const addLikeByPostID = (postId) => async (dispatch, getState) => {
  try {
    // Get data from state
    const { userId } = getState().auth.user;

    // Create like
    const like = {
      like: true,
      authorId: userId,
      postId: postId,
    };

    // Get ref to post by postId
    const docRef = doc(db, "posts", postId);

    // Add like to collection
    await addDoc(collection(docRef, "likes"), { ...like });

    // Update posts state
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (error) {
    alert(error.message);
  }
};

// DELETE LIKE FROM POST
const deleteLikeByPostID = (postId) => async (dispatch, getState) => {
  try {
    // Get data from state
    const { userId } = getState().auth.user;

    // Get ref to post by postId
    const docRef = doc(db, "posts", postId);

    // Post is Liked
    const q = query(
      collection(docRef, "likes"),
      where("authorId", "==", userId)
    );
    const likes = await getDocs(q);

    // Delete like from collection
    await deleteDoc(likes.docs[0].ref);

    // Update posts state
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (error) {
    alert(error.message);
  }
};

const postsOperations = {
  getAllPosts,
  getOwnPosts,
  addPost,
  getAllCommentsByPostId,
  addCommentByPostID,
  addLikeByPostID,
  deleteLikeByPostID,
};

export default postsOperations;
