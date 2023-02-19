const getPosts = (state) => state.posts.posts;
const getComments = (state) => state.posts.comments;

export const postsSelectors = {
  getPosts,
  getComments,
};
