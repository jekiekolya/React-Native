import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../../redux/auth/authSelectors";
import postsOperations from "../../../redux/posts/postsOperations";
import { postsSelectors } from "../../../redux/posts/postsSelectors";

// Data
// import posts from "../../../api/posts";

// Components
import CommentsEmptyIcon from "../../../assets/images/screenIcons/CommentsEmptyIcon";
import CommentsIcon from "../../../assets/images/screenIcons/CommentsIcon";
import LikeIcon from "../../../assets/images/screenIcons/LikeIcon";
import LocationIcon from "../../../assets/images/screenIcons/LocationIcon";

// Styles
import styles from "./PostsScreen.Styled";

export default function PostsScreen() {
  const dispatch = useDispatch();
  const { userName, userId, userAvatar, userEmail } = useSelector(
    authSelectors.getUser
  );

  const posts = useSelector(postsSelectors.getPosts);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(postsOperations.getAllPosts());
  }, [dispatch, postsOperations]);

  // handlers
  const addLike = (postId) => {
    dispatch(postsOperations.addLikeByPostID(postId));
  };

  const deleteLike = (postId) => {
    dispatch(postsOperations.deleteLikeByPostID(postId));
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList
        style={{ backgroundColor: "#FFFFFF" }}
        data={posts ?? []}
        ListHeaderComponent={
          <View style={styles.containerHeader}>
            <Image source={{ uri: userAvatar }} style={styles.userPhoto} />
            <View>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={styles.imagePost}
            />
            <Text style={styles.titlePost}>{item.title}</Text>
            <View style={styles.dataPost}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 24,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CommentNav", {
                        postId: item.id,
                        postImageUrl: item.imageUrl,
                      })
                    }
                    activeOpacity={0.8}
                  >
                    {item.countComments === 0 ? (
                      <CommentsEmptyIcon style={{ marginRight: 6 }} />
                    ) : (
                      <CommentsIcon style={{ marginRight: 6 }} />
                    )}
                  </TouchableOpacity>

                  <Text style={styles.textPost}>{item.countComments || 0}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item.isLiked ? (
                    <AntDesign
                      name="like1"
                      size={20}
                      color="#FF6C00"
                      style={{ marginRight: 6, marginBottom: 4 }}
                      onPress={() => deleteLike(item.id)}
                    />
                  ) : (
                    <LikeIcon
                      style={{ marginRight: 6 }}
                      onPress={() => addLike(item.id)}
                    />
                  )}
                  <Text style={styles.textPost}>{item.countLikes}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapNav", {
                    location: item.location,
                    locationData: item.locationData,
                  })
                }
                activeOpacity={0.8}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <LocationIcon style={{ marginRight: 4 }} />
                <Text
                  style={{
                    ...styles.textPost,
                    textDecorationLine: "underline",
                  }}
                >
                  {item.location}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
