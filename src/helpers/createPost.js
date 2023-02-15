import uuid from "react-native-uuid";

export default function createPost(postData) {
  return {
    id: uuid.v4(),
    title: "PostTitle",
    imageUrl:
      "https://img.itinari.com/countries/ua-ukraine.jpg?ch=DPR&dpr=2.625&w=1600&s=76b48d9430a1bdc555274df0fa944579",
    countLikes: 0,
    location: "Ukraine",
    comments: [],
    ...postData,
  };
}
