import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Data
import posts from "../../../api/posts";

// Components
import CommentsEmptyIcon from "../../../assets/images/screenIcons/CommentsEmptyIcon";
import CommentsIcon from "../../../assets/images/screenIcons/CommentsIcon";
import LikeIcon from "../../../assets/images/screenIcons/LikeIcon";
import LocationIcon from "../../../assets/images/screenIcons/LocationIcon";

// Styles
import styles from "./PostsScreen.Styled";

export default function PostsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    if (route?.params?.newPost) {
      const newPost = route.params.newPost;
      posts.unshift(newPost);
    }
  }, [route?.params?.newPost]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList
        style={{ backgroundColor: "#FFFFFF" }}
        data={posts}
        ListHeaderComponent={
          <View style={styles.containerHeader}>
            <Image
              source={{ uri: "https://i.stack.imgur.com/5Powi.jpg?s=192&g=1" }}
              style={styles.userPhoto}
            />
            <View>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>email@example.com</Text>
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
                        comments: item.comments,
                        postImageUrl: item.imageUrl,
                      })
                    }
                    activeOpacity={0.8}
                  >
                    {item.comments.length === 0 ? (
                      <CommentsEmptyIcon style={{ marginRight: 6 }} />
                    ) : (
                      <CommentsIcon style={{ marginRight: 6 }} />
                    )}
                  </TouchableOpacity>

                  <Text style={styles.textPost}>{item.comments.length}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LikeIcon style={{ marginRight: 6 }} />
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
