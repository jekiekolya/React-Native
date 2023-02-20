const getPosts = (state) => state.posts.posts;
const getOwnPosts = (state) => state.posts.ownPosts;
const getComments = (state) => state.posts.comments;

export const postsSelectors = {
  getPosts,
  getOwnPosts,
  getComments,
};
